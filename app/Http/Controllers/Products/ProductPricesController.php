<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductPricesController extends Controller
{

    public function getPrices($id, Request $request)
    {
        $all = $request->input('all', false);
        if ($all) {
            $prices = \App\Models\ProductPrice::where('product_id', $id)
                ->orderBy('active', 'desc')
                ->get();
            return response()->json($prices);
        }
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');

        $query = \App\Models\ProductPrice::query()->where('product_id', $id);

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('price', 'like', "%{$search}%");
            });
        }

        $prices = $query->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($prices);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'price' => 'required|numeric|min:0',
        ]);

        $product = \App\Models\Product::find($data['product_id']);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        \App\Models\ProductPrice::where('product_id', $data['product_id'])->update(['active' => false]);
        $product->prices()->create([
            'price' => $data['price'],
            'active' => true,
        ]);

        return response()->json($product, 201);
    }

    public function activate($id)
    {
        $price = \App\Models\ProductPrice::find($id);
        if (!$price) {
            return response()->json(['message' => 'Price not found'], 404);
        }

        \App\Models\ProductPrice::where('product_id', $price->product_id)->update(['active' => false]);
        $price->active = true;
        $price->save();

        return response()->json($price);
    }

    public function delete($id)
    {
        $price = \App\Models\ProductPrice::find($id);
        if (!$price) {
            return response()->json(['message' => 'Price not found'], 404);
        }

        $price->delete();

        return response()->json(['message' => 'Price deleted successfully']);
    }

}
