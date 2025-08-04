<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'bio',
        'genre',
        'website',
        'image_url',
    ];

    public function albums()
    {
        return $this->hasMany(Album::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }
}
