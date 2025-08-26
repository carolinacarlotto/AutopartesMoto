<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $table = 'settings';
    protected $primaryKey = 'id';
    
    protected $fillable = [
        'config_key',
        'config_value',
        'description'
    ];

    
}
