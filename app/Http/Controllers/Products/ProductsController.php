<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function index()
    {
        return inertia('Admin/Products/ProductsIndex');
    }

    public function getProducts(Request $request)
    {
        $all = $request->input('all', false);
        if ($all) {
            $products = \App\Models\Product::all();
            return response()->json($products);
        }
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');

        $query = \App\Models\Product::query();

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%");
            });
        }

        $products = $query->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($products);
    }

    public function getProductsLowStock(Request $request)
    {
        $products = \App\Models\Product::where('stock', '<=', \DB::raw('minimum_stock'))
            ->orderBy('id', 'desc')
            ->get(['id', 'name', 'stock', 'minimum_stock']);
        return response()->json($products);
    }

    public function getProduct(Request $request, $id)
    {
        $complete = $request->input('complete', false);
        $product = \App\Models\Product::find($id);

        
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->load(['prices']);

        if ($complete) {
            $product->load(['technicalSpecifications', 'multimedia']);
        }
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => 'nullable|exists:product_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'code' => 'required|string|max:100|unique:products,code',
            'minimum_stock' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
        ]);

        $product = \App\Models\Product::create($data);
        $product->prices()->create([
            'price' => $data['price'],
            'active' => true,
        ]);

        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = \App\Models\Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $data = $request->validate([
            'category_id' => 'nullable|exists:product_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'code' => 'required|string|max:100|unique:products,code,' . $id,
            'minimum_stock' => 'required|integer|min:0',
        ]);

        $product->update($data);
        return response()->json($product);
    }
}
