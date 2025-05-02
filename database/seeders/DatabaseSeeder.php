<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\EmpleadoFactory;
use Database\Factories\FestivoFactory;
use Database\Factories\HorarioFactory;
use Database\Factories\SupermercadoFactory;
use Database\Factories\VacacionesFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            EmpleadoSeeder::class,
            FestivoSeeder::class,
            HorarioSeeder::class,
            SupermercadoSeeder::class,
            VacacionesSeeder::class,
        ]);
        
    }
}