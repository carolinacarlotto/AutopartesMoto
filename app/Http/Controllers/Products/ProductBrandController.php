<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductBrandController extends Controller
{
    public function getBrands(Request $request)
    {
        $isSelect = $request->input('isSelect', false);

        if ($isSelect) {
            $brands = \App\Models\ProductBrand::select('id', 'name')->get();
            return response()->json($brands);
        }

        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $brands = \App\Models\ProductBrand::where('name', 'like', "%{$search}%")
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($brands);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:250',
        ]);

        $brand = \App\Models\ProductBrand::create($data);

        return response()->json($brand, 201);
    }
    
}
