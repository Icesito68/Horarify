<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Empleado;
use App\Models\Horario;
use App\Models\Supermercado;

class HorarioFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Horario::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'Lunes' => fake()->regexify('[A-Za-z0-9]{100}'),
            'Martes' => fake()->regexify('[A-Za-z0-9]{100}'),
            'Miercoles' => fake()->regexify('[A-Za-z0-9]{100}'),
            'Jueves' => fake()->regexify('[A-Za-z0-9]{100}'),
            'Viernes' => fake()->regexify('[A-Za-z0-9]{100}'),
            'Sabado' => fake()->regexify('[A-Za-z0-9]{100}'),
            'Domingo' => fake()->regexify('[A-Za-z0-9]{100}'),
            'Inicio_Semana' => fake()->date(),
            'supermercado_id' => Supermercado::factory(),
            'empleado_id' => Empleado::factory(),
        ];
    }
}
