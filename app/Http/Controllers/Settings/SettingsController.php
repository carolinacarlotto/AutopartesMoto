<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function getSettings(Request $request)
    {
        $setings = \App\Models\Setting::all();
        if ($setings->isEmpty()) {
            // Crear configuración predeterminada si no existe
            $defaultSettings = [
                'company_name' => '',
                'company_ruc' => '',
                'address' => '',
                'phone' => '',
                'email' => '',
                'web' => '',
            ];
            foreach ($defaultSettings as $key => $value) {
                \App\Models\Setting::create(['config_key' => $key, 'config_value' => $value]);
            }
        }

        $formatSettings = function ($settings) {
            $formatted = [];
            foreach ($settings as $setting) {
                $formatted[$setting->config_key] = $setting->config_value;
            }
            return (object) $formatted;
        };

        $settings = \App\Models\Setting::all();
        return response()->json([
            'settings' => $formatSettings($settings),
            'user' => \App\Models\User::first(),
            'taxes' => \App\Models\Tax::all()
        ]);
    }

    public function storeSettings(Request $request)
    {
        $data = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_ruc' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'web' => 'nullable|string|max:255',
        ]);

        foreach ($data as $key => $value) {
            \App\Models\Setting::updateOrCreate(
                ['config_key' => $key],
                ['config_value' => $value]
            );
        }

        return response()->json($data);
    }

    public function updateUser(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255',
            'old_password' => 'nullable|string',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user = \App\Models\User::findOrFail($request->user()->id);
        $user->fill($data);
        if ($data['password'] ?? false) {
            // validate current password
            $currentPassword = \DB::table('users')->where('id', $user->id)->value('password');
            if (!\Hash::check($data['old_password'], $currentPassword)) {
                return response()->json([
                    'error' => 'El password actual es incorrecto.'
                ], 403);
            }
            $user->password = bcrypt($data['password']);
        }
        $user->save();

        return response()->json($user);
    }

    public function storeTax(Request $request)
    {
        $data = $request->validate([
            'rate' => 'required|numeric|min:0|max:100',
        ]);

        \App\Models\Tax::create($data);
        $taxes = \App\Models\Tax::all();
        return response()->json($taxes);
    }

    public function changeActiveTax($id)
    {
        $tax = \App\Models\Tax::findOrFail($id);
        $tax->active = !$tax->active;
        $tax->save();

        //Only one active tax is allowed
        if ($tax->active) {
            \App\Models\Tax::where('id', '!=', $id)->update(['active' => false]);
        }

        return response()->json($tax);
    }

}
