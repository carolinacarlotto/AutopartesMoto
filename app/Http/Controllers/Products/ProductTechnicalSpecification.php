<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductTechnicalSpecification extends Controller
{
    public function getProductTechnicalSpecifications($id)
    {
        $specifications = \App\Models\TechnicalSpecification::where('product_id', $id)->get();

        return response()->json($specifications);
    }

    public function store($id, Request $request)
    {
        // Validate the request
        $request->validate([
            'key' => 'required|string|max:255',
            'value' => 'nullable|string',
        ]);

        // Loop through each specification and create a new record
        \App\Models\TechnicalSpecification::create([
            'key' => $request->key,
            'value' => $request->value ?? null,
            'product_id' => $id,
        ]);

        return response()->json(['message' => 'Especificaciones técnicas guardadas correctamente']);
    }

    public function destroy($id)
    {
        $specification = \App\Models\TechnicalSpecification::find($id);

        if (!$specification) {
            return response()->json(['message' => 'Especificación no encontrada'], 404);
        }

        $specification->delete();

        return response()->json(['message' => 'Especificación eliminada correctamente']);
    }
}
