<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Customers\CustomersController;

Route::group([
    'prefix' => 'admin/customers',
    'as' => 'admin.customers.',
    'middleware' => ['auth', 'verified']
], function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Customers/CustomersIndex');
    })->name('index');
    Route::get('/get', [CustomersController::class, 'getCustomers'])->name('get');
    Route::post('/store', [CustomersController::class, 'store'])->name('store');
});
