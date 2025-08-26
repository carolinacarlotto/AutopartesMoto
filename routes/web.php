<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('admin.dashboard');
})->name('admin.home')->middleware(['auth', 'verified']);

Route::get('/home', function () {
    return inertia('Home', [
        'title' => 'Dashboard',
        'description' => 'Welcome to your dashboard'
    ]);
})->name('admin.dashboard')->middleware(['auth', 'verified']);

require __DIR__.'/sales/sales.php';
require __DIR__.'/products/products.php';
require __DIR__.'/customers/customers.php';
require __DIR__.'/settings/settings.php';
