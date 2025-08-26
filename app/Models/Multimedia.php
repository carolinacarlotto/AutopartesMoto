<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Multimedia extends Model
{
    protected $table = 'multimedia';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'file_path',
        'mime_type',
        'user_id',
        'multimediable_id',
        'multimediable_type',
    ];

    protected $appends = ['complete_file_path'];

    public function getCompleteFilePathAttribute()
    {
        return env('APP_URL') . '/storage/' . $this->file_path;
    }

    public function multimediable()
    {
        return $this->morphTo();
    }

    // when deleting a multimedia item, also delete the associated file
    public static function boot()
    {
        parent::boot();

        static::deleting(function ($multimedia) {
            Storage::disk('public')->delete($multimedia->file_path);
        });
    }
}
