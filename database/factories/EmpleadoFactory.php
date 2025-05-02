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
            'DNI' => fake()->regexify('[A-Za-z0-9]{9}'),
            'Nombre' => fake()->regexify('[A-Za-z0-9]{50}'),
            'Apellidos' => fake()->regexify('[A-Za-z0-9]{75}'),
            'Telefono' => fake()->regexify('[A-Za-z0-9]{9}'),
            'Turno' => fake()->regexify('[A-Za-z0-9]{25}'),
            'Horas_Semanales' => fake()->word(),
            'Dia_Libre' => fake()->randomElement(["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]),
            'Rotativo' => fake()->boolean(),
            'Especial' => fake()->boolean(),
            'Email' => fake()->word(),
            'supermercado_id' => Supermercado::factory(),
        ];
    }
}
