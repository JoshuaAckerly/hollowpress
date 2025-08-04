<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
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
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(),
            'event_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'venue' => $this->faker->company() . ' Hall',
            'location' => $this->faker->city(),
            'price' => $this->faker->randomFloat(2, 10, 100),
        ];
    }
}
