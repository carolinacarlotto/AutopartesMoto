<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductPrice extends Model
{
    protected $table = 'product_prices';
    protected $primaryKey = 'id';

    protected $fillable = [
        'product_id',
        'price',
        'active',
        'start_date',
        'end_date'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function scopeActive($query)
    {
        return $query->where('active', true)
                     ->where(function ($query) {
                         $query->whereNull('start_date')
                               ->orWhere('start_date', '<=', now());
                     })
                     ->where(function ($query) {
                         $query->whereNull('end_date')
                               ->orWhere('end_date', '>=', now());
                     });
    }

    public function scopeForProduct($query, $productId)
    {
        return $query->where('product_id', $productId);
    }

    public function scopeForActiveProduct($query, $productId)
    {
        return $query->forProduct($productId)->active();
    }

    public function scopeForDateRange($query, $startDate, $endDate)
    {
        return $query->where(function ($query) use ($startDate, $endDate) {
            $query->whereNull('start_date')
                  ->orWhere('start_date', '<=', $endDate);
        })->where(function ($query) use ($startDate, $endDate) {
            $query->whereNull('end_date')
                  ->orWhere('end_date', '>=', $startDate);
        });
    }
}
