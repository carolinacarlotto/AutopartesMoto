<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaleDetail extends Model
{
    protected $table = 'sale_details';
    protected $primaryKey = 'id';

    protected $fillable = [
        'sale_id',
        'product_id',
        'quantity',
        'unit_price',
        'purchase_price',
        'tax_percentage',
        'total_price'
    ];

    public function sale()
    {
        return $this->belongsTo(Sale::class, 'sale_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

}
