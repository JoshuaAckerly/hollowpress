<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Artist extends Model
{
    /** @phpstan-ignore missingType.generics */
    use HasFactory;

    protected $fillable = [
        'name',
        'bio',
        'genre',
        'website',
        'image_url',
    ];

    /** @return HasMany<Album, $this> */
    public function albums(): HasMany
    {
        // @phpstan-ignore-next-line return.type
        return $this->hasMany(Album::class);
    }

    /** @return HasMany<Event, $this> */
    public function events(): HasMany
    {
        // @phpstan-ignore-next-line return.type
        return $this->hasMany(Event::class);
    }
}
