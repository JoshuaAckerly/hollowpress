<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Album extends Model
{
    /** @phpstan-ignore missingType.generics */
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

    /** @return BelongsTo<Artist, $this> */
    public function artist(): BelongsTo
    {
        // @phpstan-ignore-next-line return.type
        return $this->belongsTo(Artist::class);
    }
}
