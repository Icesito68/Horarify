<?php

namespace Database\Seeders;

use App\Models\Supermercado;
use Illuminate\Database\Seeder;

class SupermercadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Supermercado::factory()->count(5)->create();
    }
}
