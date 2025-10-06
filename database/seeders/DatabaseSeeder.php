<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Database\Seeders\TestDataSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Role::insert([
            ['name' => 'admin', 'guard_name' => 'web'],
        ]);

        User::factory()->create([
            'name' => 'Mi usuario',
            'email' => 'raul_namay@hotmail.com',
            'password' => bcrypt('usuario2025!'), // Ensure to hash the password
            'email_verified_at' => now(), // Set email verification date
        ])->assignRole('admin'); // Assign the admin role to the user

        Customer::create([
            'name' => 'Cliente 000',
            'last_name' => '000',
            'type' => 'individual',
            'document_type' => 'dni',
            'document_number' => '00000000',
            'company_name' => '',
            'contact_name' => '',
            'phone' => '',
            'email' => '',
            'address' => '',
        ]);

        \App\Models\Tax::insert([
            'rate' => 18.0000, // 18%
            'active' => true,
            'start_date' => \Carbon\Carbon::now()->startOfYear(),
            'end_date' => null
        ]);

        $this->call([
            CustomersSeeder::class,
            ProductsSeeder::class,
            SalesSeeder::class,
        ]);
    }
}
