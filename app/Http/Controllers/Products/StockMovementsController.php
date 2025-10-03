<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StockMovementsController extends Controller
{
    public function index()
    {
        return inertia('Admin/Products/StockMovementsIndex');
    }

    public function getStockMovements(Request $request)
    {
        $all = $request->input('all', false);
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $productId = $request->input('product_id');

        $query = \App\Models\StockMovement::query();
        if ($productId) {
            $query->filterByProduct($productId);
        }

        if ($all) {
            $movements = $query
                ->with(['product', 'productBatch'])
                ->orderBy('created_at', 'desc') 
                ->get();
            return response()->json($movements);
        }

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('description', 'like', "%{$search}%")
                      ->orWhereHas('product', function ($query) use ($search) {
                          $query->where('name', 'like', "%{$search}%");
                      });
            });
        }

        $movements = $query->orderBy('created_at', 'desc')
            ->with(['product', 'productBatch'])
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($movements);
    }

    /**
     * This method is to get products with more sales.
     */
    public function getTopSelling(Request $request)
    {
        $query = \App\Models\StockMovement::query();
        $query->select('product_id', \DB::raw('SUM(quantity) as total_quantity'), \DB::raw('sum(total_unit_price) - sum(total_purchase_price) as total_profit'))
            ->groupBy(['product_id', 'type'])
            ->having('type', 'sales')
            ->with(['product:id,name,category_id,brand_id'])
            ->orderBy('total_quantity', 'desc')
            ->limit(10);

        return response()->json($query->get());
    }

}
