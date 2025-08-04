<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable = [
        'artist_id',
        'title',
        'description',
        'event_date',
        'venue',
        'location',
        'price',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'price' => 'decimal:2',
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}
