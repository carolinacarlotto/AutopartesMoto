<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Products\ProductsController;
use App\Http\Controllers\Products\ProductPricesController;
use App\Http\Controllers\Products\ProductMultimedia;
use App\Http\Controllers\Products\ProductCategoriesController;
use App\Http\Controllers\Products\ProductBrandController;
use App\Http\Controllers\Products\ProductMeasureController;    
use App\Http\Controllers\Products\ProductBatchesController;
use App\Http\Controllers\Products\StockMovementsController;
use App\Http\Controllers\Products\ProductTechnicalSpecification;

Route::group([
    'prefix' => 'admin/products',
    'as' => 'admin.products.',
    'middleware' => ['auth', 'verified']
], function () {
    Route::get('/', [ProductsController::class, 'index'])->name('index');
    Route::get('/get', [ProductsController::class, 'getProducts'])->name('get');
    Route::get('/get-low-stock', [ProductsController::class, 'getProductsLowStock'])->name('getLowStock');
    Route::get('/get/{id}', [ProductsController::class, 'getProduct'])->name('getProduct');
    Route::post('/store', [ProductsController::class, 'store'])->name('store');
    Route::put('/{id}/update', [ProductsController::class, 'update'])->name('update');

    Route::group([
        'prefix' => 'prices',
        'as' => 'prices.',
    ], function () {
        Route::get('/{id}/get', [ProductPricesController::class, 'getPrices'])->name('get');
        Route::post('/store', [ProductPricesController::class, 'store'])->name('store');
        Route::post('/{id}/active', [ProductPricesController::class, 'activate'])->name('activate');
        Route::delete('/{id}/delete', [ProductPricesController::class, 'delete'])->name('delete');
    });

    Route::group([
        'prefix' => 'multimedia',
        'as' => 'multimedia.',
    ], function () {
        Route::get('/{id}/get', [ProductMultimedia::class, 'getProductMultimedia'])->name('get');
        Route::post('/{id}/store', [ProductMultimedia::class, 'store'])->name('store');
        Route::delete('/{id}/delete', [ProductMultimedia::class, 'destroy'])->name('destroy');
    });

    Route::group([
        'prefix' => 'technical-specifications',
        'as' => 'technicalSpecifications.',
    ], function () {
        Route::get('/{id}/get', [ProductTechnicalSpecification::class, 'getProductTechnicalSpecifications'])->name('get');
        Route::post('/{id}/store', [ProductTechnicalSpecification::class, 'store'])->name('store');
        Route::delete('/{id}/delete', [ProductTechnicalSpecification::class, 'destroy'])->name('destroy');
    });

    Route::group([
        'prefix' => 'categories',
        'as' => 'categories.',
    ], function () {
        Route::get('/', [ProductCategoriesController::class, 'index'])->name('index');
        Route::get('/get', [ProductCategoriesController::class, 'getCategories'])->name('get');
        Route::post('/store', [ProductCategoriesController::class, 'store'])->name('store');
    });

    Route::group([
        'prefix' => 'brands',
        'as' => 'brands.',
    ], function () {
        Route::get('/get', [ProductBrandController::class, 'getBrands'])->name('get');
        Route::post('/store', [ProductBrandController::class, 'store'])->name('store');
    });

    Route::group([
        'prefix' => 'measures',
        'as' => 'measures.',
    ], function () {
        Route::get('/get', [ProductMeasureController::class, 'getMeasures'])->name('get');
        Route::post('/store', [ProductMeasureController::class, 'store'])->name('store');
    });

    Route::group([
        'prefix' => 'batches',
        'as' => 'batches.',
    ], function () {
        Route::post('/store', [ProductBatchesController::class, 'store'])->name('store');
        Route::get('/get', [ProductBatchesController::class, 'getProductBatches'])->name('get');
    });

    Route::group([
        'prefix' => 'movements',
        'as' => 'movements.',
    ], function () {
        Route::get('/get', [StockMovementsController::class, 'getStockMovements'])->name('get');
        Route::get('/getTopSelling', [StockMovementsController::class, 'getTopSelling'])->name('getTopSelling');
    });

});

