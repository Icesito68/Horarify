<?php

namespace Database\Seeders;

use App\Models\Festivo;
use Illuminate\Database\Seeder;

class FestivoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Festivo::factory()->count(5)->create();
    }
}
