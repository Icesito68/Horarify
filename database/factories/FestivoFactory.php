<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Festivo;
use App\Models\Supermercado;

class FestivoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Festivo::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'Fecha' => fake()->date(),
            'Nombre' => fake()->name('[A-Za-z]{20}'),
            'supermercado_id' => Supermercado::inRandomOrder()->first()->id,
        ];
    }
}