<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customers';
    protected $primaryKey = 'id';
    
    protected $fillable = [
        'name',
        'last_name',
        'type',
        'document_type',
        'document_number',
        'company_name',
        'contact_name',
        'email',
        'phone',
        'address'
    ];

    protected $casts = [
        'document_number' => 'string',
        'email' => 'string',
        'phone' => 'string',
    ];

    public function getFullNameAttribute()
    {
        return trim("{$this->name} {$this->last_name}");
    }

    public function getTypeNameAttribute()
    {
        return $this->type === 'individual' ? 'Individual' : 'Empresa';
    }

    public function getDocumentTypeNameAttribute()
    {
        return match ($this->document_type) {
            'dni' => 'DNI',
            'ruc' => 'RUC',
            'passport' => 'Pasaporte',
            default => 'Otro',
        };
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

}
