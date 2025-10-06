<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SalesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suppliers = [
            "B . J . R . SELVA S . A . C . (20601638143)",
            "CASA DE LA BICICLETA E.I.R.L. (20309418027)",
            "CASA DEL REPUESTO S.A.C. (20283394370)",
            "CHINA YANG ZU S.A.C. (20392656562)",
            "CORPORACION BJR IMPORT SUR S.A.C. (20536579746)",
            "CORPORACION CAYMAN S.A.C. (20493190611)",
            "GRUPO DELTA SELVA S.A.C. (20603603223)",
            "HAOJIN SELVA S.A.C. (20612922722)",
            "LUBRICANTES DE ALTURA S.A.C. (20496651481)",
            "MADESEL S.A.C. (20393093782)",
            "MOTO REPUESTOS & AB SOC. ANONIMA CERRADA (20441097604)",
            "NOR OIL SAC (20480880154)",
            "ORIENTE IMPORT DEL PERU S.R.L. (20101453414)",
            "REPRESENTACIONES TECNIMOTORS E.I.R.L. (20100990998)",
            "REPUESTOS new LID S.R.L. (20479378763)",
            "SOCOPUR S.A.C. (20128967606)",
            "SUMINISTROS DEL ORIENTE S.R.L. (20404493885)",
            "SUSY IMPORT E.I.R.L. (20393997681)",
            "TOTAL IMPORT & EXPORT S.R.L. (20393377381)",
            "VISTONY COMPAÑIA INDUSTRIAL DEL PERU SOCIEDAD ANONIMA CERRADA (20102306598)",
            "VOLDA ORIENTE S.A.C. (20611786922)"
        ];


        // generate sales between start of current year and now
        $now = \Carbon\Carbon::now();
        $startOfYear = $now->copy()->startOfYear();
        // add 1 day to startOfYear to avoid issues with time comparison
        $startOfYear->addDay();
        $endOfPeriod = $now;

        // generate between 10 and 20 sales by day
        $days = $startOfYear->diffInDays($endOfPeriod);
        echo "Seeding sales for $days days...\n";
        \DB::beginTransaction();
        try {
            for ($i = 0; $i <= $days; $i++) {
                $date = $startOfYear->copy()->addDays($i);
                echo "Seeding sales for date: " . $date->toDateString() . "\n";
                $salesCount = rand(4, 10);
                $hourStart = 8; // 8 AM
                for ($j = 0; $j < $salesCount; $j++) {
                    echo "  Creating sale " . ($j + 1) . " of $salesCount\n";
                    $data = [];
                    //$documentNumber = 'S' . now()->format('YmdHis');
                    /*$documentNumber = 'S' . $date->format('Ymd') . str_pad($j + 1, 4, '0', STR_PAD_LEFT);
                    $data['document_number'] = $documentNumber;*/
                    $dateSale = $date->copy()->addHours($hourStart)->addMinutes(rand(0, 59))->addSeconds(rand(0, 59));
                    $hourStart = $hourStart + 1;
                    $customer = \App\Models\Customer::inRandomOrder()->first();
                    // id document type dni: document_number B-00000001 or RUC: document_number F-00000001
                    // document number must be unique and 8 digits for dni and 11 for ruc, no contains letters except B- or F- at the beginning, no contains date or time
                    if ($customer->document_type == 'RUC') {
                        $fCounts = \App\Models\Sale::where('document_number', 'like', '%F%')->count();
                        $documentNumber = 'F-' . str_pad($fCounts + 1, 8, '0', STR_PAD_LEFT);
                    } else {
                        $bCounts = \App\Models\Sale::where('document_number', 'like', '%B%')->count();
                        $documentNumber = 'B-' . str_pad($bCounts + 1, 8, '0', STR_PAD_LEFT);
                    }
                    $data['document_number'] = $documentNumber;

                    $dataSale = [
                        'customer_id' => $customer->id,
                        'document_number' => $documentNumber,
                        'subtotal' => 0,
                        'discount' => 0,
                        'tax' => 0,
                        'total' => 0,
                        'payment_method' => 'cash',
                        'sale_date' => $dateSale,
                        'user_id' => 1,
                        'user_name' => 'Mi usuario',
                        'created_at' => $dateSale,
                        'updated_at' => $dateSale,
                    ];
                    $sale = \App\Models\Sale::create($dataSale);

                    $quantityItems = rand(1, 7);
                    $data['items'] = [];
                    $allProductIds = \App\Models\Product::pluck('id')->toArray();
                    $selectedProductIds = (array)array_rand(array_flip($allProductIds), $quantityItems);
                    foreach ($selectedProductIds as $productId) {
                        $data['items'][] = [
                            'id' => $productId,
                            'quantity' => rand(1, 3),
                        ];
                    }

                    $totalPrice = 0;
                    foreach ($data['items'] as $item) {
                        $product = \App\Models\Product::findOrFail($item['id']);
                        if ($product->stock < $item['quantity']) {
                            //throw new \Exception("Insufficient stock for product: {$product->name}");
                            // If insufficient stock, skip this item
                            //continue;
                            $quantity = rand(5, 20);
                            $countBatches = \App\Models\ProductBatch::where('product_id', $product->id)->count();
                            $batchNumber = "LOTE-{$product->id}-" . str_pad($countBatches + 1, 5, '0', STR_PAD_LEFT);

                            $randomSupplier = array_rand(array_flip($suppliers));

                            $batch = \App\Models\ProductBatch::create([
                                'product_id' => $product->id,
                                'supplier' => $randomSupplier,
                                'batch_number' => $batchNumber,
                                'quantity_received' => $quantity,
                                'quantity_available' => $quantity,
                                'user_id' => 1,
                                'purchase_price' => $product->price_sale * 0.5, // assuming purchase price is 60% of sale price
                                'created_at' => $date->copy()->startOfDay()->subDays(1),
                                'updated_at' => $date->copy()->startOfDay()->subDays(1),
                            ]);

                            \App\Models\StockMovement::create([
                                'product_id' => $batch->product_id,
                                'product_batch_id' => $batch->id,
                                'quantity' => $batch->quantity_received,
                                'type' => 'income', // Assuming 'income' for received stock
                                'description' => "Received batch {$batch->batch_number} from supplier '{$batch->supplier}'",
                                'purchase_price' => $batch->purchase_price,
                                'total_purchase_price' => $batch->quantity_received * $batch->purchase_price,
                                'model_type' => \App\Models\ProductBatch::class,
                                'model_id' => $batch->id,
                                'user_id' => null,
                                'movement_date' => $date->copy()->startOfDay()->subDays(1),
                                'created_at' => $date->copy()->startOfDay()->subDays(1),
                                'updated_at' => $date->copy()->startOfDay()->subDays(1),
                            ]);

                            // Update the product stock
                            $product->stock += $batch->quantity_received;
                            $product->save();
                        }
                        $saleDetail = \App\Models\SaleDetail::create([
                            'sale_id' => $sale->id,
                            'product_id' => $item['id'],
                            'quantity' => $item['quantity'],
                            'unit_price' => $product->price_sale,
                            'created_at' => $dateSale,
                            'updated_at' => $dateSale,
                        ]);
                        $totalPrice += $product->price_sale * $item['quantity'];
                        // Update product stock
                        $product->stock -= $item['quantity'];
                        $product->updated_at = $dateSale;
                        $product->save();
                        // Update product batch stock
                        $auxQuantity = $item['quantity'];
                        while ($auxQuantity > 0) {
                            $productBatch = \App\Models\ProductBatch::where('product_id', $item['id'])
                                ->where('quantity_available', '>', 0)
                                ->first();
                            if (!$productBatch) {
                                //throw new \Exception("No available batch for product: {$product->name}");
                                // MOVIMIENTOS DE INVENTARIO INICIALES
                                // random quantity between 5 and 20
                                $quantity = rand(5, 20);
                                $countBatches = \App\Models\ProductBatch::where('product_id', $product->id)->count();
                                $batchNumber = "LOTE-{$product->id}-" . str_pad($countBatches + 1, 5, '0', STR_PAD_LEFT);

                                $randomSupplier = array_rand(array_flip($suppliers));

                                $batch = \App\Models\ProductBatch::create([
                                    'product_id' => $product->id,
                                    'supplier' => $randomSupplier,
                                    'batch_number' => $batchNumber,
                                    'quantity_received' => $quantity,
                                    'quantity_available' => $quantity,
                                    'user_id' => 1,
                                    'purchase_price' => $product->price_sale * 0.5, // assuming purchase price is 60% of sale price
                                    'created_at' => $date->copy()->startOfDay()->subDays(1),
                                    'updated_at' => $date->copy()->startOfDay()->subDays(1),
                                ]);

                                \App\Models\StockMovement::create([
                                    'product_id' => $batch->product_id,
                                    'product_batch_id' => $batch->id,
                                    'quantity' => $batch->quantity_received,
                                    'type' => 'income', // Assuming 'income' for received stock
                                    'description' => "Received batch {$batch->batch_number} from supplier '{$batch->supplier}'",
                                    'purchase_price' => $batch->purchase_price,
                                    'total_purchase_price' => $batch->quantity_received * $batch->purchase_price,
                                    'model_type' => \App\Models\ProductBatch::class,
                                    'model_id' => $batch->id,
                                    'user_id' => null,
                                    'movement_date' => $date->copy()->startOfDay()->subDays(1),
                                    'created_at' => $date->copy()->startOfDay()->subDays(1),
                                    'updated_at' => $date->copy()->startOfDay()->subDays(1),
                                ]);

                                // Update the product stock
                                $product->stock += $batch->quantity_received;
                                $product->updated_at = $date->copy()->startOfDay()->subDays(1);
                                $product->save();

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
                                    'user_id' => 1,
                                    'movement_date' => $dateSale,
                                    'created_at' => $dateSale,
                                    'updated_at' => $dateSale
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
                                    'user_id' => 1,
                                    'movement_date' => $dateSale,
                                    'created_at' => $dateSale,
                                    'updated_at' => $dateSale
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
                        'discount' => $discountAmount,
                        'created_at' => $dateSale,
                        'updated_at' => $dateSale
                    ]);
                }
            }

            \DB::commit();
        } catch (\Exception $e) {
            echo "Error seeding sales: " . $e->getMessage() . "\n";
            \DB::rollBack();
        }
    }
}
