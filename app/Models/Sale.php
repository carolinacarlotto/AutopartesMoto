<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $table = 'sales';
    protected $primaryKey = 'id';

    protected $fillable = [
        'document_number',
        'customer_id',
        'sale_date',
        'subtotal',
        'discount',
        'tax',
        'total',
        'cancelled_at',
        'notes',
        'payment_method',
        'user_id',
        'user_name'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function details()
    {
        return $this->hasMany(SaleDetail::class, 'sale_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Scope a query to only include non-cancelled sales.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeNonCancelled($query)
    {
        return $query->whereNull('cancelled_at');
    }

    /**
     * Scope a query to range sales by date.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param \Carbon\Carbon $startDate
     * @param \Carbon\Carbon $endDate
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('sale_date', [$startDate, $endDate]);
    }

    /**
     * Scope a query to include sales from the last month.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeThisMonth($query)
    {
        return $query->whereMonth('sale_date', now()->month)
                     ->whereYear('sale_date', now()->year);
    }

    /**
     * Scope a query to include sales from the last week.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeThisWeek($query)
    {
        return $query->whereBetween('sale_date', [now()->startOfWeek(), now()->endOfWeek()]);
    }

    /**
     * Scope a query to include sales from today.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeToday($query)
    {
        return $query->whereDate('sale_date', now());
    }

}
