<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Settings\SettingsController;

Route::group([
    'prefix' => 'admin/settings',
    'as' => 'admin.settings.',
    'middleware' => ['auth', 'verified']
], function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Settings/SettingsIndex');
    })->name('index');

    Route::get('/get', [SettingsController::class, 'getSettings'])->name('get');
    Route::post('/store-settings', [SettingsController::class, 'storeSettings'])->name('store-settings');
    Route::post('/update-user', [SettingsController::class, 'updateUser'])->name('update-user');
    Route::post('/store-tax', [SettingsController::class, 'storeTax'])->name('store-tax');
    Route::post('/change-active-tax/{id}', [SettingsController::class, 'changeActiveTax'])->name('change-active-tax');
});

