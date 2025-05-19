<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Empleado;
use App\Models\Vacaciones;

class VacacionesFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Vacaciones::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-1 months', '+2 months');
        $end = (clone $start)->modify('+10 days');

        return [
            'Fecha_inicio' => $start->format('Y-m-d'),
            'Fecha_fin' => $end->format('Y-m-d'),
            'empleado_id' => \App\Models\Empleado::inRandomOrder()->first()->id,
        ];
    }
}