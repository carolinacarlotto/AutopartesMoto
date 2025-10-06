<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    public function getSalesAnalytics(Request $request) 
    {
        $salesTodayData = \App\Models\Sale::today()->with(['customer', 'user'])->get();
        $salesThisWeekData = \App\Models\Sale::thisWeek()->with(['customer', 'user'])->get();
        $salesThisMonthData = \App\Models\Sale::thisMonth()->with(['customer', 'user'])->get();

        $salesToday = \App\Models\Sale::today()->count();
        $salesThisWeek = \App\Models\Sale::thisWeek()->count();
        $salesThisMonth = \App\Models\Sale::thisMonth()->count();

        $totalSalesToday = \App\Models\Sale::today()->sum('total');
        $totalSalesThisWeek = \App\Models\Sale::thisWeek()->sum('total');
        $totalSalesThisMonth = \App\Models\Sale::thisMonth()->sum('total');

        $analytics = [
            'today' => [
                'sales' => $salesToday,
                'total' => $totalSalesToday,
                'data' => $salesTodayData,
            ],
            'this_week' => [
                'sales' => $salesThisWeek,
                'total' => $totalSalesThisWeek,
                'data' => $salesThisWeekData,
            ],
            'this_month' => [
                'sales' => $salesThisMonth,
                'total' => $totalSalesThisMonth,
                'data' => $salesThisMonthData,
            ],
        ];

        $startDate = $request->input('start_date') ?? null;
        $endDate = $request->input('end_date') ?? null;

        if ($startDate && $endDate) {
            $salesInRange = \App\Models\Sale::dateRange($startDate, $endDate)->get();
            $analytics['range'] = [
                'sales' => $salesInRange->count(),
                'total' => $salesInRange->sum('total'),
                'data' => $salesInRange,
            ];
        }

        return response()->json($analytics);
    }
    public function getSales(Request $request)
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $all = $request->input('all', false);

        $query = \App\Models\Sale::query();

        if ($all) {
            $sales = $query->with(['customer', 'user'])->get();
            return response()->json($sales);
        }

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('document_number', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%")
                            ->orWhere('document_number', 'like', "%{$search}%");
                    });
            });
        }

        $sales = $query->orderBy('created_at', 'desc')
            ->with(['customer', 'user'])
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($sales);
    }

    public function getSale($id)
    {
        $sale = \App\Models\Sale::with(['customer', 'user', 'details.product'])->findOrFail($id);
        return response()->json($sale);
    }
    

    public function store(Request $request)
    {

        $data = $request->validate([
            'customer' => 'required|array',
            'customer.id' => 'required|exists:customers,id',
            'customer.name' => 'required|string|max:255',
            'customer.document_type' => 'required|string|max:255',
            'customer.document_number' => 'required|string|max:255',
            'discountPercent' => 'nullable|numeric|min:0',
            'items' => 'required|array',
            'items.*.id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        /*$documentNumber = 'S' . now()->format('YmdHis');
        $data['document_number'] = $documentNumber;*/
        $customer = \App\Models\Customer::findOrFail($data['customer']['id']);
        if ($customer->document_type == 'RUC') {
            $fCounts = \App\Models\Sale::where('document_number', 'like', '%F%')->count();
            $documentNumber = 'F-' . str_pad($fCounts + 1, 8, '0', STR_PAD_LEFT);
        } else {
            $bCounts = \App\Models\Sale::where('document_number', 'like', '%B%')->count();
            $documentNumber = 'B-' . str_pad($bCounts + 1, 8, '0', STR_PAD_LEFT);
        }
        $data['document_number'] = $documentNumber;

        $dataSale = [
            'customer_id' => $data['customer']['id'],
            'document_number' => $documentNumber,
            'subtotal' => $request->input('subtotal', 0),
            'discount' => $request->input('discount', 0),
            'tax' => $request->input('tax', 0),
            'total' => $request->input('total', 0),
            'payment_method' => $request->input('paymentMethod', 'cash'),
            'sale_date' => now(),
            'user_id' => auth()->id() ?? null,
            'user_name' => auth()->user()->name ?? null,
            'notes' => $request->input('notes', null),
        ];
        \DB::beginTransaction();
        try {
            $sale = \App\Models\Sale::create($dataSale);

            $totalPrice = 0;
            foreach ($data['items'] as $item) {
                $product = \App\Models\Product::findOrFail($item['id']);
                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Insufficient stock for product: {$product->name}");
                }
                $saleDetail = \App\Models\SaleDetail::create([
                    'sale_id' => $sale->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price_sale,
                ]);
                $totalPrice += $product->price_sale * $item['quantity'];
                // Update product stock
                $product->stock -= $item['quantity'];
                $product->save();
                // Update product batch stock
                $auxQuantity = $item['quantity'];
                while ($auxQuantity > 0) {
                    $productBatch = \App\Models\ProductBatch::where('product_id', $item['id'])
                        ->where('quantity_available', '>', 0)
                        ->first();
                    if (!$productBatch) {
                        throw new \Exception("No available batch for product: {$product->name}");
                    }
                    if ($productBatch->quantity_available >= $auxQuantity) {
                        $productBatch->quantity_available -= $auxQuantity;
                        $productBatch->save();
                        // Create stock movement for the batch
                        \App\Models\StockMovement::create([
                            'product_id' => $product->id,
                            'product_batch_id' => $productBatch->id,
                            'quantity' => $auxQuantity,
                            'type' => 'sales',
                            'unit_price' => $product->price_sale,
                            'total_unit_price' => $product->price_sale * $auxQuantity,
                            'purchase_price' => $productBatch->purchase_price,
                            'total_purchase_price' => $productBatch->purchase_price * $auxQuantity,
                            'description' => "Sale of {$auxQuantity} units of product {$product->name} from batch {$productBatch->batch_number}",
                            'model_type' => \App\Models\SaleDetail::class,
                            'model_id' => $saleDetail->id,
                            'user_id' => auth()->id() ?? null,
                            'movement_date' => now(),
                        ]);
                        $auxQuantity = 0; // Exit the loop as we have used the required quantity
                        break;
                    } else {
                        $dispatchQuantity = $productBatch->quantity_available;
                        $auxQuantity -= $productBatch->quantity_available;
                        $productBatch->quantity_available = 0;
                        $productBatch->save();
                        // Create stock movement for the batch
                        \App\Models\StockMovement::create([
                            'product_id' => $product->id,
                            'product_batch_id' => $productBatch->id,
                            'quantity' => $dispatchQuantity,
                            'type' => 'sales',
                            'unit_price' => $product->price_sale,
                            'total_unit_price' => $product->price_sale * $dispatchQuantity,
                            'purchase_price' => $productBatch->purchase_price,
                            'total_purchase_price' => $productBatch->purchase_price * $dispatchQuantity,
                            'description' => "Sale of {$dispatchQuantity} units of product {$product->name} from batch {$productBatch->batch_number}",
                            'model_type' => \App\Models\SaleDetail::class,
                            'model_id' => $saleDetail->id,
                            'user_id' => auth()->id() ?? null,
                            'movement_date' => now(),
                        ]);
                    }
                }
            }

            /**
             * const discountAmount = (total * discount) / 100;
             * const tax = (total - discountAmount) * 0.18; // 18% tax
             * const subtotal = total - discountAmount - tax;
             */
            $discountAmount = $totalPrice * ($data['discountPercent'] ?? 0) / 100;
            $taxInDB = \App\Models\Tax::where('active', true)->first();
            if ($taxInDB) {
                $taxRate = $taxInDB->rate / 100; // Assuming rate is stored as a percentage
                $tax = ($totalPrice - $discountAmount) * $taxRate;
            } else {
                $tax = 0; // Default to 0 if no active tax found
            }

            $subtotal = $totalPrice - $discountAmount - $tax;

            $sale->update([
                'total' => $totalPrice,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'discount' => $discountAmount
            ]);

            \DB::commit();

            return response()->json(['message' => 'Sale created successfully', 'sale' => $sale], 201);
        } catch (\Exception $e) {
            \DB::rollBack();
            return response()->json(['error' => 'Error creating sale: ' . $e->getMessage()], 500);
        }
    }
}
