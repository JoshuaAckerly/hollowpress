<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Album>
 */
class AlbumFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'artist_id' => \App\Models\Artist::factory(),
            'title' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(),
            'release_date' => $this->faker->date(),
        ];
    }
}
