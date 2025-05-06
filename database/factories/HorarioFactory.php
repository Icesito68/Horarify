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
            'Lunes' => fake()->randomElement(['07:30 - 15:30','08:00 - 16:00','14:30 - 22:30','15:00 - 23:00','Libre']),
            'Martes' => fake()->randomElement(['07:30 - 15:30','08:00 - 16:00','14:30 - 22:30','15:00 - 23:00','Libre']),
            'Miercoles' => fake()->randomElement(['07:30 - 15:30','08:00 - 16:00','14:30 - 22:30','15:00 - 23:00','Libre']),
            'Jueves' => fake()->randomElement(['07:30 - 15:30','08:00 - 16:00','14:30 - 22:30','15:00 - 23:00','Libre']),
            'Viernes' => fake()->randomElement(['07:30 - 15:30','08:00 - 16:00','14:30 - 22:30','15:00 - 23:00','Libre']),
            'Sabado' => fake()->randomElement(['07:30 - 15:30','08:00 - 16:00','14:30 - 22:30','15:00 - 23:00','Libre']),
            'Domingo' => fake()->randomElement(['07:30 - 15:30','08:00 - 16:00','14:30 - 22:30','15:00 - 23:00','Libre']),
            'Inicio_Semana' => fake()->date(),
            'supermercado_id' => Supermercado::inRandomOrder()->first()->id,
            'empleado_id' => Empleado::factory(),
        ];
    }
}