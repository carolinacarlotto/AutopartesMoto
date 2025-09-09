<?php

namespace App\Http\Controllers\Customers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CustomersController extends Controller
{
    /*public function index()
    {
        return inertia('Admin/Customers/CustomersIndex');
    }*/

    public function getCustomers(Request $request)
    {
        $all = $request->input('all', false);
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');

        $query = \App\Models\Customer::query();

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('phone', 'like', "%{$search}%")
                      ->orWhere('document_number', 'like', "%{$search}%");
            });
        }

        if ($all) {
            $customers = $query->get();
            return response()->json($customers);
        }

        $customers = $query->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($customers);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string|in:individual,business',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'document_type' => 'nullable|string|max:50|in:dni,ruc,passport',
            'document_number' => 'nullable|string|max:50|unique:customers,document_number',
            'contact_name' => 'nullable|string|max:255',
        ],
        [
            'document_number.unique' => 'El número de documento ya está registrado.',
        ]);

        // If the customer type is business, ensure company_name is provided
        if ($data['type'] === 'business') {
            $data['company_name'] = $request->validate([
                'company_name' => 'required|string|max:255',
            ])['company_name'];
        } else {
            $data['company_name'] = null; // Ensure company_name is null for individuals
        }

        /**
         * dni: 12345678 (8 digits)
         * ruc: 12345678901 (11 digits)
         * passport: A12345678 (1-2 letters followed by 6-7 digits)
         */
        // Validate the document based on the type
        if ($data['document_type'] === 'dni') {
            $request->validate([
                'document_number' => 'required|string|size:8|regex:/^\d{8}$/',
            ]);
        } elseif ($data['document_type'] === 'ruc') {
            $request->validate([
                'document_number' => 'required|string|size:11|regex:/^\d{11}$/',
            ]);
        } elseif ($data['document_type'] === 'passport') {
            $request->validate([
                'document_number' => 'required|string|size:9|regex:/^[A-Z0-9]{1,2}\d{6,7}$/',
            ]);
        }

        $customer = \App\Models\Customer::create($data);

        return response()->json($customer, 201);
    }
}
