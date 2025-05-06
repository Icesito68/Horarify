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
        return [
            'Fecha_inicio' => fake()->date(),
            'Fecha_fin' => fake()->date(),
            'empleado_id' => Empleado::factory(),
        ];
    }
}
