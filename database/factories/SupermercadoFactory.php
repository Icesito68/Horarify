<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Supermercado;
use App\Models\User;

class SupermercadoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Supermercado::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'Nombre' => fake()->name('[A-Za-z]{20}'),
            'Direccion' => fake()->address(),
            'NIF' => fake()->regexify('^[0-9]{8}[A-Z]{1}'),
            'users_id' => User::factory(),
        ];
    }
}
