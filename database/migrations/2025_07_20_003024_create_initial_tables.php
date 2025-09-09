<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('config_key')->unique()->comment('Key name for the configuration');
            $table->string('config_value')->nullable()->comment('Value for the configuration');
            $table->string('description')->nullable()->comment('Description of the configuration');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('taxes', function (Blueprint $table) {
            $table->id();
            $table->decimal('rate', 10, 4)->comment('Tax percentage like 18.0000 for 18%');
            $table->boolean('active')->default(false)->comment('Indicates if the tax is currently active');
            $table->dateTime('start_date')->nullable()->comment('Start date for the tax applicability');
            $table->dateTime('end_date')->nullable()->comment('End date for the tax applicability');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Name of the product category');
            $table->string('description')->nullable()->comment('Description of the product category');
            $table->timestamps();
            $table->softDeletes();
        });
        
        Schema::create('product_brands', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Name of the product brand');
            $table->string('description')->nullable()->comment('Description of the product brand');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('product_measures', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Name of the product measure');
            $table->string('description')->nullable()->comment('Description of the product measure');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id')->nullable()->comment('ID of the product category');
            $table->unsignedBigInteger('brand_id')->nullable()->comment('ID of the product brand');
            $table->unsignedBigInteger('measure_id')->nullable()->comment('ID of the product measure');
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('code')->unique();
            $table->integer('stock')->default(0)->comment('Current stock level of the product');
            $table->integer('minimum_stock')->default(0)->comment('Stock threshold for low stock alerts');
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraint to ensure category exists
            $table->foreign('category_id')->references('id')->on('product_categories')->nullOnDelete();
            $table->foreign('brand_id')->references('id')->on('product_brands')->nullOnDelete();
            $table->foreign('measure_id')->references('id')->on('product_measures')->nullOnDelete();
            $table->index(['category_id'], 'product_category_index');
            $table->index(['name'], 'product_name_index');
            $table->index(['code'], 'product_code_index');
            $table->unique(['name', 'code'], 'unique_product_name_code');
        });

        Schema::create('product_batches', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->comment('ID of the product associated with the batch');
            $table->string('batch_number')->comment('Batch number of the product');
            $table->dateTime('manufacture_date')->nullable()->comment('Manufacture date of the product');
            $table->dateTime('expiry_date')->nullable()->comment('Expiry date of the product');
            $table->integer('quantity_available')->default(0)->comment('Quantity available in the batch');
            $table->integer('quantity_received')->default(0)->comment('Quantity received in the batch');
            $table->decimal('purchase_price', 17, 4)->default(0)->comment('Purchase price of the product in the batch');
            $table->decimal('sale_price', 17, 4)->default(0)->comment('Sale price of the product in the batch');
            $table->string('supplier')->nullable()->comment('Supplier of the product in the batch');
            $table->string('notes')->nullable()->comment('Additional notes for the batch');
            $table->string('user_id')->nullable()->comment('ID of the user who created the batch');
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraint to ensure product exists
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->index(['product_id', 'batch_number'], 'product_batch_product_index');
        });

        Schema::create('product_prices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->decimal('price', 17, 4)->comment('Price of the product');
            $table->boolean('active')->default(false)->comment('Indicates if the price is currently active');
            $table->dateTime('start_date')->nullable()->comment('Start date for the price applicability');
            $table->dateTime('end_date')->nullable()->comment('End date for the price applicability');
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraint to ensure product exists
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->index(['product_id'], 'product_price_type_index');
            $table->index(['start_date', 'end_date'], 'product_price_date_index');
            $table->unique(['product_id', 'start_date'], 'unique_product_price');
            $table->unique(['product_id', 'end_date'], 'unique_product_price_end_date');
            $table->unique(['product_id', 'start_date', 'end_date'], 'unique_product_price_full');
        });

        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->comment('ID of the product associated with the movement');
            $table->unsignedBigInteger('product_batch_id')->nullable()->comment('ID of the product batch associated with the movement');
            $table->enum('type', ['income', 'sales', 'adjustment', 'return', 'transfer'])->comment('income = stock income, sales = stock sale, adjustment = stock adjustment, return = stock return, transfer = stock transfer');
            $table->integer('quantity')->default(0)->comment('Quantity of stock movement');
            $table->decimal('unit_price', 17, 4)->default(0)->comment('Unit price at which the stock movement occurred');
            $table->decimal('total_unit_price', 17, 4)->default(0)->comment('Total unit price at which the stock movement occurred');
            $table->decimal('purchase_price', 17, 4)->default(0)->comment('Purchase price at which the stock movement occurred');
            $table->decimal('total_purchase_price', 17, 4)->default(0)->comment('Total purchase price at which the stock movement occurred');
            $table->string('description')->nullable();
            $table->string('model_type')->nullable()->comment('Type of model associated with the movement, e.g., Order, Invoice');
            $table->unsignedBigInteger('model_id')->nullable()->comment('ID of the model associated with the movement');
            $table->unsignedBigInteger('user_id')->nullable()->comment('ID of the user who made the movement');
            $table->timestamp('movement_date')->useCurrent();
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraint to ensure product exists
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('product_batch_id')->references('id')->on('product_batches')->onDelete('set null');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->index(['product_id'], 'stock_movement_product_index');
            $table->index(['product_batch_id'], 'stock_movement_product_batch_index');
            $table->index(['type'], 'stock_movement_type_index');
            $table->index(['movement_date'], 'stock_movement_date_index');
            $table->index(['product_id', 'type'], 'stock_movement_product_type_index');
            $table->index(['model_type', 'model_id'], 'stock_movement_model_index');
        });

        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('last_name')->nullable()->comment('Last name of the customer');
            $table->enum('type', ['individual', 'business'])->default('individual')->comment('Type of customer: individual or business');
            $table->string('document_type')->nullable()->comment('Type of document, e.g., DNI, RUC');
            $table->string('document_number')->nullable()->unique()->comment('Document number, e.g., 12345678 for DNI');
            $table->string('company_name')->nullable()->comment('Company name if the customer is a business');
            $table->string('contact_name')->nullable()->comment('Name of the contact person');
            $table->string('phone')->nullable();
            $table->string('email')->nullable()->unique();
            $table->string('address')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['document_type', 'document_number'], 'customer_document_index');
            $table->index(['name', 'last_name'], 'customer_name_index');
            $table->index(['company_name'], 'customer_company_index');
            $table->index(['email'], 'customer_email_index');
            $table->unique(['document_type', 'document_number'], 'unique_customer_document');
            $table->unique(['email'], 'unique_customer_email');
            $table->unique(['name', 'last_name', 'document_type', 'document_number'], 'unique_customer_full');
        });

        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('document_number')->unique()->comment('Unique sale document number');
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->dateTime('sale_date')->useCurrent()->comment('Date of the sale');
            $table->decimal('subtotal', 17, 4)->default(0);
            $table->decimal('discount', 17, 4)->default(0);
            $table->decimal('tax', 17, 4)->default(0)->comment('Tax amount (e.g., IGV)');
            $table->decimal('total', 17, 4)->default(0);
            $table->dateTime('cancelled_at')->nullable()->comment('Date when the sale was cancelled, if applicable');            
            $table->string('notes')->nullable()->comment('Additional notes for the sale');
            $table->string('payment_method')->nullable()->comment('Payment method used for the sale');
            $table->unsignedBigInteger('user_id')->nullable()->comment('ID of the user who made the sale');
            $table->string('user_name')->nullable()->comment('Name of the user who made the sale');
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraint to ensure customer exists
            $table->foreign('customer_id')->references('id')->on('customers')->nullOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();
            $table->index(['customer_id'], 'sales_customer_index');
            $table->index(['sale_date'], 'sales_date_index');
            $table->index(['document_number'], 'sales_document_number_index');
            $table->index(['customer_id', 'sale_date'], 'sales_customer_date_index');
            $table->unique(['document_number'], 'unique_sale_document_number');
            $table->index(['customer_id', 'document_number'], 'sales_customer_document_index');
            $table->index(['sale_date', 'document_number'], 'sales_date_document_index');
        });

        Schema::create('sale_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sale_id')->comment('ID of the sale associated with the detail');
            $table->unsignedBigInteger('product_id')->comment('ID of the product associated with the detail');
            $table->unsignedBigInteger('product_batch_id')->nullable()->comment('ID of the product batch associated with the detail');
            $table->integer('quantity')->default(1);
            $table->decimal('unit_price', 17, 4)->default(0);
            $table->decimal('purchase_price', 17, 4)->default(0);
            $table->decimal('tax_percentage', 17, 4)->default(0);
            $table->decimal('total_price', 17, 4)->default(0);
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraints to ensure sale and product exist
            $table->foreign('sale_id')->references('id')->on('sales')->cascadeOnDelete();
            $table->foreign('product_id')->references('id')->on('products')->restrictOnDelete();
            $table->foreign('product_batch_id')->references('id')->on('product_batches')->restrictOnDelete();
            $table->index(['sale_id', 'product_id'], 'sale_detail_sale_product_index');
            $table->index(['product_id'], 'sale_detail_product_index');
            $table->index(['sale_id'], 'sale_detail_sale_index');
            $table->unique(['sale_id', 'product_id'], 'unique_sale_detail');
            $table->unique(['sale_id', 'product_id', 'created_at'], 'unique_sale_detail_timestamp');
            $table->index(['created_at'], 'sale_detail_created_at_index');
            $table->index(['sale_id', 'created_at'], 'sale_detail_sale_created_at_index');
            $table->index(['product_id', 'created_at'], 'sale_detail_product_created_at_index');
            $table->index(['sale_id', 'product_id', 'created_at'], 'sale_detail_sale_product_created_at_index');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_details');
        Schema::dropIfExists('sales');
        Schema::dropIfExists('customers');
        Schema::dropIfExists('product_prices');
        Schema::dropIfExists('stock_movements');
        Schema::dropIfExists('products');
        Schema::dropIfExists('product_categories');
        Schema::dropIfExists('taxes');
        Schema::dropIfExists('settings');
    }
};
