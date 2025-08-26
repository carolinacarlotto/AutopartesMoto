<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TechnicalSpecification extends Model
{
    protected $table = 'technical_specifications';
    protected $primaryKey = 'id';

    protected $fillable = [
        'key',
        'value',
        'product_id',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}
