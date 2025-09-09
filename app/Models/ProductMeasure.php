<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductMeasure extends Model
{
    protected $table = 'product_measures';

    protected $fillable = ['name', 'description'];    

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    protected $casts = [
        'id' => 'integer',
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'measure_id');
    }
}
