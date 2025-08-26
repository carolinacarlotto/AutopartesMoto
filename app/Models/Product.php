<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'id';

    protected $fillable = [
        'category_id',
        'name',
        'description',
        'code',
        'stock',
        'minimum_stock',
    ];

    protected $casts = [
        'stock' => 'integer',
        'minimum_stock' => 'integer',
    ];

    protected $appends = ['category_name', 'price_sale', 'price'];


    public function getCategoryNameAttribute()
    {
        return $this->category ? $this->category->name : 'Sin categoría';
    }

    public function getPriceSaleAttribute()
    {
        return round($this->prices()->where('active', true)->first()->price ?? 0, 2);
    }

    public function getPriceAttribute()
    {
        return $this->getPriceSaleAttribute();
    }

    public function prices()
    {
        return $this->hasMany(ProductPrice::class);
    }

    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function technicalSpecifications()
    {
        return $this->hasMany(TechnicalSpecification::class);
    }

    public function multimedia()
    {
        //morphMany
        return $this->morphMany(Multimedia::class, 'multimediable');
    }
}

