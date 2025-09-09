<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductBatch;
use App\Models\StockMovement;

class ProductBatchesController extends Controller
{

    public function index()
    {
        return inertia('Admin/Products/ProductBatchesIndex');
    }

    public function getProductBatches(Request $request)
    {
        $all = $request->input('all', false);
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $productId = $request->input('product_id');

        $query = ProductBatch::query();

        if ($productId) {
            $query->where('product_id', $productId);
        }

        if ($all) {
            $batches = $query->get();
            return response()->json($batches);
        }

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('batch_number', 'like', "%{$search}%")
                      ->orWhere('supplier', 'like', "%{$search}%");
            });
        }

        $batches = $query->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($batches);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            //'batch_number' => 'required|string|max:255',
            'manufacture_date' => 'nullable|date',
            'expiry_date' => 'nullable|date|after:manufacture_date',
            'quantity_received' => 'required|integer|min:1',
            'purchase_price' => 'required|numeric|min:0',
            'supplier' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:1000',
        ]);

        // Create the product batch, add quantity_available and quantity_received
        $validated['quantity_available'] = $validated['quantity_received']; // Initially, all received stock is available
        $validated['user_id'] = auth()->id(); // Assuming you want to track the user who created the batch
        $countBatches = ProductBatch::where('product_id', $validated['product_id'])->count();
        $validated['batch_number'] = "LOTE-{$validated['product_id']}-" . str_pad($countBatches + 1, 5, '0', STR_PAD_LEFT);

        $batch = ProductBatch::create($validated);

        $stockMovement = StockMovement::create([
            'product_id' => $batch->product_id,
            'product_batch_id' => $batch->id,
            'quantity' => $batch->quantity_received,
            'type' => 'income', // Assuming 'income' for received stock
            'description' => "Received batch {$batch->batch_number} from supplier '{$batch->supplier}'",
            'purchase_price' => $batch->purchase_price,
            'total_purchase_price' => $batch->quantity_received * $batch->purchase_price,
            'model_type' => ProductBatch::class,
            'model_id' => $batch->id,
            'user_id' => auth()->id() ?? null,
            'movement_date' => now(),
        ]);

        // Update the product stock
        $product = $batch->product;
        $product->stock += $batch->quantity_received;
        $product->save();

        return response()->json($batch, 201);
    }
}
