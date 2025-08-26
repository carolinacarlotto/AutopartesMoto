<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductCategoriesController extends Controller
{
    public function index()
    {
        return inertia('Admin/Products/ProductCategoriesIndex');
    }

    public function getCategories(Request $request)
    {
        $isSelect = $request->input('isSelect', false);

        if ($isSelect) {
            $categories = \App\Models\ProductCategory::select('id', 'name')->get();
            return response()->json($categories);
        }

        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $categories = \App\Models\ProductCategory::where('name', 'like', "%{$search}%")
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:250',
        ]);

        $category = \App\Models\ProductCategory::create($data);

        return response()->json($category, 201);
    }
}
