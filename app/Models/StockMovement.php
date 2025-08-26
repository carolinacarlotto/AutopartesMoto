<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    protected $table = 'stock_movements';
    
    protected $fillable = [
        'product_id',
        'product_batch_id',
        'type',
        'quantity',
        'unit_price',
        'total_unit_price',
        'purchase_price',
        'total_purchase_price',
        'description',
        'model_type',
        'model_id',
        'user_id',
        'movement_date'
    ];

    protected $casts = [
        'movement_date' => 'datetime',
        'quantity' => 'integer',
        'unit_price' => 'decimal:4',
        'purchase_price' => 'decimal:4'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function productBatch()
    {
        return $this->belongsTo(ProductBatch::class);
    }

    public function model()
    {
        return $this->morphTo();
    }

    public function scopeFilterByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeFilterByProduct($query, $productId)
    {
        return $query->where('product_id', $productId);
    }
}
