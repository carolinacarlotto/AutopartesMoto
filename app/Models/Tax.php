<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tax extends Model
{
    protected $table = 'taxes';
    protected $primaryKey = 'id';

    protected $fillable = [
        'rate', // Assuming rate is stored as a percentage like 18.0000 for 18%
        'active',
        'start_date',
        'end_date'
    ];
}
