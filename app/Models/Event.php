<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    /** @phpstan-ignore missingType.generics */
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

    /** @return BelongsTo<Artist, $this> */
    public function artist(): BelongsTo
    {
        // @phpstan-ignore-next-line return.type
        return $this->belongsTo(Artist::class);
    }
}
