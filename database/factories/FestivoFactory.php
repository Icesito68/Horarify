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
            'Fecha' => fake()->dateTimeBetween('2025-01-01', '2025-12-31')->format('Y-m-d'),
            'Nombre' => fake()->randomElement([
                'Carnaval Local',
                'Festividad Patronal',
                'Fiesta de Barrio',
                'San Isidro',
                'Fiesta Regional',
                'Día de la Comunidad'
            ]),
            'supermercado_id' => Supermercado::inRandomOrder()->first()->id,
        ];
    }
}