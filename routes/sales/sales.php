<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use Illuminate\Http\Request;
use App\Http\Controllers\Sales\SalesController;

Route::group([
    'prefix' => 'admin/sales',
    'as' => 'admin.sales.',
    'middleware' => ['auth', 'verified']
], function () {
    Route::get('/', function (Request $request) {
        $search = $request->input('search', '');
        return Inertia::render('Admin/Sales/SalesIndex', [
            'search' => $search,
        ]);
    })->name('index');

    Route::get('/get', [SalesController::class, 'getSales'])->name('get');
    Route::get('/get/{id}', [SalesController::class, 'getSale'])->name('getSale')->where('id', '[0-9]+');
    Route::get('/get-analytics', [SalesController::class, 'getSalesAnalytics'])->name('getAnalytics');
    Route::post('/store', [SalesController::class, 'store'])->name('store');
});

