<?php

namespace Database\Factories;

use App\Models\CaseStudy;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CaseStudyFactory extends Factory
{
    protected $model = CaseStudy::class;

    public function definition(): array
    {
        $title = $this->faker->sentence(4);
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraphs(2, true),
            'challenge' => $this->faker->paragraphs(3, true),
            'solution' => $this->faker->paragraphs(3, true),
            'results' => $this->faker->paragraphs(2, true),
            'client_name' => $this->faker->company(),
            'project_type' => $this->faker->randomElement(['Web Development', 'Mobile App', 'Branding', 'UI/UX Design', 'Full Stack', 'E-commerce']),
            'project_date' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'technologies' => $this->faker->randomElements(['Laravel', 'React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'], $this->faker->numberBetween(3, 6)),
            'featured_image' => null,
            'gallery_images' => null,
            'project_url' => $this->faker->boolean(70) ? $this->faker->url() : null,
            'is_featured' => $this->faker->boolean(30),
        ];
    }
}
