<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Multimedia;
use App\Models\Product; 

class ProductMultimedia extends Controller
{

    public function getProductMultimedia($id)
    {
        $multimedia = Multimedia::where('multimediable_id', $id)
            ->where('multimediable_type', Product::class)
            ->get();

        return response()->json($multimedia);
    }

    public function store($id, Request $request)
    {
        $files = $request->file('files');

        foreach ($files as $file) {
            // save file in storage public and multimedia morph model
            $multimedia = new Multimedia();
            $multimedia->name = $file->getClientOriginalName();
            //$multimedia->file_path = $file->store('multimedia');
            $multimedia->file_path = $file->store('multimedia', 'public');
            $multimedia->mime_type = $file->getMimeType();
            $multimedia->user_id = auth()->id() ?? null;
            $multimedia->multimediable_id = $id;
            $multimedia->multimediable_type = Product::class;
            $multimedia->save();
        }

        return response()->json(['message' => 'Archivos guardados correctamente']);
    }

    public function destroy($id)
    {
        $multimedia = Multimedia::find($id);

        if ($multimedia) {
            $multimedia->delete();

            return response()->json([
                'message' => 'Archivo eliminado correctamente',
            ]);
        }

        return response()->json(['message' => 'Archivo no encontrado'], 404);
    }
}
