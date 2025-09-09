<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductMeasureController extends Controller
{
    public function getMeasures(Request $request)
    {
        $isSelect = $request->input('isSelect', false);

        if ($isSelect) {
            $measures = \App\Models\ProductMeasure::select('id', 'name')->get();
            return response()->json($measures);
        }

        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $measures = \App\Models\ProductMeasure::where('name', 'like', "%{$search}%")
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($measures);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:250',
        ]);

        $measure = \App\Models\ProductMeasure::create($data);

        return response()->json($measure, 201);
    }
}
