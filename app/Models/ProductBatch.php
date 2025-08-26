<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductBatch extends Model
{
    protected $table = 'product_batches';
    protected $primaryKey = 'id';

    protected $fillable = [
        'product_id',
        'batch_number',
        'manufacture_date',
        'expiry_date',
        'quantity_available',
        'quantity_received',
        'purchase_price',
        'sale_price',
        'supplier',
        'notes',
        'user_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $appends = ['product_name'];

    public function getProductNameAttribute()
    {
        return Product::find($this->product_id)->name ?? 'Unknown Product';
    }

    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
