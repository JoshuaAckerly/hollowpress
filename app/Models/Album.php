<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;
    protected $fillable = [
        'artist_id',
        'title',
        'description',
        'release_date',
        'cover_image',
    ];

    protected $casts = [
        'release_date' => 'date',
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}
