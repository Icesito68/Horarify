<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Empleado;
use App\Models\Supermercado;

class EmpleadoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Empleado::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'dni' => fake()->regexify('^[0-9]{8}[A-Z]{1}'),
            'nombre' => fake()->name('[A-Za-z]{20}'),
            'apellidos' => fake()->name('[A-Za-z]{20}'),
            'telefono' => fake()->regexify('^[6]{1}[0-9]{8}'),
            'turno' => fake()->randomElement(['07:30 - 15:30','08:00 - 16:00','14:30 - 22:30','15:00 - 23:00']),
            'horas_Semanales' => fake()->numberBetween(20, 40),
            'dia_Libre' => fake()->randomElement(["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]),
            'rotativo' => fake()->boolean(),
            'especial' => fake()->boolean(),
            'email' => fake()->unique()->safeEmail(),
            'supermercado_id' => Supermercado::factory(),
        ];
    }
}
