<?php

namespace Database\Factories;

use App\Models\Artist;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Artist>
 */
class ArtistFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'bio' => $this->faker->paragraphs(2, true),
            'genre' => $this->faker->randomElement(['Electronic', 'Ambient', 'Experimental', 'Synthwave', 'Dark Ambient', 'Industrial']),
            'website' => $this->faker->url(),
        ];
    }
}
