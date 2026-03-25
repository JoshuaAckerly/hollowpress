<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'author_name',
        'author_type',
    ];

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Return related posts based on title keyword overlap and author type.
     * Keywords are extracted from the current post's title, filtered for
     * significance (length > 3, not stop words). Falls back to same
     * author_type when no keywords yield results.
     *
     * @param  int  $limit  Maximum number of related posts to return.
     */
    public function related(int $limit = 3): Collection
    {
        $stopWords = [
            'the', 'and', 'for', 'that', 'with', 'this', 'from', 'are',
            'was', 'were', 'have', 'has', 'been', 'not', 'but', 'you',
            'all', 'can', 'her', 'him', 'his', 'its', 'our', 'out', 'who',
        ];

        $words = collect(preg_split('/[\s\W]+/', strtolower($this->title), -1, PREG_SPLIT_NO_EMPTY))
            ->filter(fn (string $w) => mb_strlen($w) > 3 && ! in_array($w, $stopWords))
            ->unique()
            ->values()
            ->take(5);

        $authorType = $this->author_type;

        $query = static::where('id', '!=', $this->id)
            ->select(['id', 'title', 'author_name', 'author_type', 'created_at']);

        if ($words->isNotEmpty()) {
            $query->where(function ($q) use ($words, $authorType): void {
                $q->where('author_type', $authorType);
                foreach ($words as $word) {
                    $q->orWhere('title', 'like', "%{$word}%");
                }
            });
        } else {
            $query->where('author_type', $authorType);
        }

        return $query->latest()->limit($limit)->get();
    }
}
