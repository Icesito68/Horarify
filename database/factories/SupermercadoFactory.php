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
            'Nombre' => fake()->regexify('[A-Za-z0-9]{50}'),
            'Direccion' => fake()->regexify('[A-Za-z0-9]{100}'),
            'NIF' => fake()->regexify('[A-Za-z0-9]{9}'),
            'users_id' => User::factory(),
            'user_id' => User::factory(),
        ];
    }
}
