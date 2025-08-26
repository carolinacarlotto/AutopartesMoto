<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            'app_name' => 'Sales Management System',
            'app_description' => 'A web application for managing sales',
            'app_version' => '1.0.0',
            'default_currency' => 'S/.',
            'timezone' => 'UTC',
        ];

        foreach ($settings as $key => $value) {
            \App\Models\Setting::updateOrCreate(
                ['config_key' => $key],
                ['config_value' => $value]
            );
        }

        $taxes = [
            ['rate' => 18, 'active' => true]
        ];

        foreach ($taxes as $tax) {
            \App\Models\Tax::updateOrCreate(
                ['rate' => $tax['rate']],
                ['active' => $tax['active']]
            );
        }

        // 20 products with prices and stock movements
        // Each product will have a sale price, purchase price, and stock movements
        $products = [
            [
                'name' => 'Product A',
                'description' => 'Description for Product A',
                'code' => 'PROD-A',
                'stock' => 100,
                'minimum_stock' => 10,
                'prices' => [
                    ['price' => 20.00, 'active' => true],
                ],
                'stock_movements' => [
                    [
                        'type' => 'income',
                        'quantity' => 50,
                        'unit_price' => 20.00,
                        'purchase_price' => 15.00,
                        'description' => 'Initial stock',
                        'movement_date' => now(),
                    ],
                ],
            ],
            [
                'name' => 'Product B',
                'description' => 'Description for Product B',
                'code' => 'PROD-B',
                'stock' => 50,
                'minimum_stock' => 5,
                'prices' => [
                    ['price' => 30.00, 'active' => true],
                ],
                'stock_movements' => [
                    [
                        'type' => 'income',
                        'quantity' => 30,
                        'unit_price' => 30.00,
                        'purchase_price' => 25.00,
                        'description' => 'Initial stock',
                        'movement_date' => now(),
                    ],
                ],
            ],
            [
                'name' => 'Product C',
                'description' => 'Description for Product C',
                'code' => 'PROD-C',
                'stock' => 200,
                'minimum_stock' => 20,
                'prices' => [
                    ['price' => 10.00, 'active' => true],
                ],
                'stock_movements' => [
                    [
                        'type' => 'income',
                        'quantity' => 100,
                        'unit_price' => 10.00,
                        'purchase_price' => 8.00,
                        'description' => 'Initial stock',
                        'movement_date' => now(),
                    ],
                ],
            ],
            [
                'name' => 'Product D',
                'description' => 'Description for Product D',
                'code' => 'PROD-D',
                'stock' => 75,
                'minimum_stock' => 7,
                'prices' => [
                    ['price' => 25.00, 'active' => true],
                ],
                'stock_movements' => [
                    [
                        'type' => 'income',
                        'quantity' => 40,
                        'unit_price' => 25.00,
                        'purchase_price' => 20.00,
                        'description' => 'Initial stock',
                        'movement_date' => now(),
                    ],
                ],
            ],
            [
                'name' => 'Product E',
                'description' => 'Description for Product E',
                'code' => 'PROD-E',
                'stock' => 120,
                'minimum_stock' => 12,
                'prices' => [
                    ['price' => 15.00, 'active' => true],
                ],
                'stock_movements' => [
                    [
                        'type' => 'income',
                        'quantity' => 60,
                        'unit_price' => 15.00,
                        'purchase_price' => 12.00,
                        'description' => 'Initial stock',
                        'movement_date' => now(),
                    ],
                ],
            ],
            [
                'name' => 'Product F',
                'description' => 'Description for Product F',
                'code' => 'PROD-F',
                'stock' => 90,
                'minimum_stock' => 9,
                'prices' => [
                    ['price' => 18.00, 'active' => true],
                ],
                'stock_movements' => [
                    [
                        'type' => 'income',
                        'quantity' => 45,
                        'unit_price' => 18.00,
                        'purchase_price' => 14.00,
                        'description' => 'Initial stock',
                        'movement_date' => now(),
                    ],
                ],
            ],
            [
                'name' => 'Product G',
                'description' => 'Description for Product G',
                'code' => 'PROD-G',
                'stock' => 110,
                'minimum_stock' => 11,
                'prices' => [
                    ['price' => 22.00, 'active' => true],
                ],
                'stock_movements' => [
                    [
                        'type' => 'income',
                        'quantity' => 55,
                        'unit_price' => 22.00,
                        'purchase_price' => 18.00,
                        'description' => 'Initial stock',
                        'movement_date' => now(),
                    ],
                ],
            ],
            [
                'name' => 'Product H',
                'description' => 'Description for Product H',
                'code' => 'PROD-H',
                'stock' => 130,
                'minimum_stock' => 13,
                'prices' => [
                    ['price' => 20.00, 'active' => true],
                ],
                'stock_movements' => [
                    [
                        'type' => 'income',
                        'quantity' => 65,
                        'unit_price' => 20.00,
                        'purchase_price' => 16.00,
                        'description' => 'Initial stock',
                        'movement_date' => now(),
                    ],
                ],
            ],
            [
                'name' => 'Product I',
                'description' => 'Description for Product I',
                'code' => 'PROD-I',
                'stock' => 140,
                'minimum_stock' => 14,
                'prices' => [
                    ['price' => 25.00, 'active' => true],
                ],
                'stock_movements' => [
                    [
                        'type' => 'income',
                        'quantity' => 70,
                        'unit_price' => 25.00,
                        'purchase_price' => 20.00,
                        'description' => 'Initial stock',
                        'movement_date' => now(),
                    ],
                ],
            ],
            [
                'name' => 'Product J',
                'description' => 'Description for Product J',
                'code' => 'PROD-J',
                'stock' => 160,
                'minimum_stock' => 16,
                'prices' => [
                    ['price' => 30.00, 'active' => true],
                ],
                'stock_movements' => [
                    [
                        'type' => 'income',
                        'quantity' => 80,
                        'unit_price' => 30.00,
                        'purchase_price' => 25.00,
                        'description' => 'Initial stock',
                        'movement_date' => now(),
                    ],
                ],
            ],
            [
                'name' => 'Product K',
                'description' => 'Description for Product K',
                'code' => 'PROD-K',
                'stock' => 180,
                'minimum_stock' => 18,
                'prices' => [
                    ['price' => 28.00, 'active' => true],
                ],
                'stock_movements' => [
                    [
                        'type' => 'income',
                        'quantity' => 90,
                        'unit_price' => 28.00,
                        'purchase_price' => 24.00,
                        'description' => 'Initial stock',
                        'movement_date' => now(),
                    ],
                ],
            ],
            [
                'name' => 'Product L',
                'description' => 'Description for Product L',
                'code' => 'PROD-L',
                'stock' => 200,
                'minimum_stock' => 20,
                'prices' => [
                    ['price' => 35.00, 'active' => true],
                ],
                'stock_movements' => [
                    [
                        'type' => 'income',
                        'quantity' => 100,
                        'unit_price' => 35.00,
                        'purchase_price' => 30.00,
                        'description' => 'Initial stock',
                        'movement_date' => now(),
                    ]
                ]
            ],
            [
                'name' => 'Product M',
                'description' => 'Description for Product M',
                'code' => 'PROD-M',
                'stock' => 220,
                'minimum_stock' => 22,
                'prices' => [
                    ['price' => 40.00, 'active' => true],
                ],
                'stock_movements' => [
                    [
                        'type' => 'income',
                        'quantity' => 110,
                        'unit_price' => 40.00,
                        'purchase_price' => 35.00,
                        'description' => 'Initial stock',
                        'movement_date' => now(),
                    ]
                ]
            ]
        ];

        foreach ($products as $productData) {
            $product = \App\Models\Product::create([
                'name' => $productData['name'],
                'description' => $productData['description'],
                'code' => $productData['code'],
                'stock' => $productData['stock'],
                'minimum_stock' => $productData['minimum_stock'],
            ]);

            foreach ($productData['prices'] as $price) {
                \App\Models\ProductPrice::create([
                    'product_id' => $product->id,
                    'price' => $price['price'],
                    'active' => $price['active']
                ]);
            }

            foreach ($productData['stock_movements'] as $movement) {
                \App\Models\StockMovement::create(array_merge($movement, [
                    'product_id' => $product->id,
                    'user_id' => 1, // Assuming user ID 1 exists
                ]));
            }
        }

        $customers = [
            ['name' => 'Customer A', 'email' => 'customerA@example.com'],
            ['name' => 'Customer B', 'email' => 'customerB@example.com'],
        ];

        foreach ($customers as $customerData) {
            \App\Models\Customer::create($customerData);
        }   


        // generate 3 sales with details
        $totalSales = 3;
        for ($i = 1; $i <= $totalSales; $i++) {
            $sale = \App\Models\Sale::create([
                'customer_id' => \App\Models\Customer::inRandomOrder()->first()->id,
                'user_id' => 1, // Assuming user ID 1 exists
                'document_number' => 'INV-00' . $i,
                'sale_date' => now()
            ]);

            $sumTotal = 0;
            for ($j = 0; $j < 2; $j++) {
                $product = \App\Models\Product::inRandomOrder()
                ->whereNotIn('id', $sale->details->pluck('product_id'))
                ->first();
                $price = $product->prices()->where('active', true)->first();
                if (!$price) {
                    continue; // Skip if no active price is found
                }
                $quantity = rand(1, 5);
                $sale->details()->create([
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $price->price,
                    'total_price' => ($quantity * $price->price),
                ]);
                $sumTotal += ($quantity * $price->price);
            }
            $sale->update([
                'total' => $sumTotal,
                'tax' => $sumTotal * 0.18, // Assuming 18% tax
                'subtotal' => $sumTotal - ($sumTotal * 0.18), // Subtotal before tax
            ]);

            // Create stock movements for the sale
            foreach ($sale->details as $detail) {
                \App\Models\StockMovement::create([
                    'product_id' => $detail->product_id,
                    'type' => 'sale',
                    'quantity' => -$detail->quantity,
                    'unit_price' => $detail->unit_price,
                    'purchase_price' => $detail->unit_price, // Assuming sale price is the same
                    'description' => "Sale of {$detail->quantity} units of {$detail->product->name}",
                    'model_type' => \App\Models\Sale::class,
                    'model_id' => $sale->id,
                    'user_id' => $sale->user_id,
                    'movement_date' => now(),
                ]);
                // Update product stock
                $product = $detail->product;
                $product->stock -= $detail->quantity;
                $product->save();
            }

        }
    }
}
