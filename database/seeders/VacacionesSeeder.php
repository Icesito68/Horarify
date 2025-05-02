<?php

namespace Database\Seeders;

use App\Models\Vacaciones;
use Illuminate\Database\Seeder;

class VacacionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Vacaciones::factory()->count(10)->create();
    }
}
