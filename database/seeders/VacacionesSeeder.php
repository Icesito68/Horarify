<?php

namespace Database\Seeders;

use App\Models\Vacaciones;
use Illuminate\Database\Seeder;

class VacacionesSeeder extends Seeder
{
    public function run(): void
    {
        // SUPERMERCADO 1
        Vacaciones::create([
            'Fecha_inicio' => '2025-07-15',
            'Fecha_fin' => '2025-07-31',
            'empleado_id' => 1,
        ]);

        Vacaciones::create([
            'Fecha_inicio' => '2025-08-01',
            'Fecha_fin' => '2025-08-15',
            'empleado_id' => 2,
        ]);

        // SUPERMERCADO 2
        Vacaciones::create([
            'Fecha_inicio' => '2025-06-10',
            'Fecha_fin' => '2025-06-24',
            'empleado_id' => 10,
        ]);

        Vacaciones::create([
            'Fecha_inicio' => '2025-09-01',
            'Fecha_fin' => '2025-09-14',
            'empleado_id' => 11,
        ]);

        // SUPERMERCADO 3
        Vacaciones::create([
            'Fecha_inicio' => '2025-08-05',
            'Fecha_fin' => '2025-08-20',
            'empleado_id' => 12,
        ]);

        Vacaciones::create([
            'Fecha_inicio' => '2025-12-26',
            'Fecha_fin' => '2026-01-05',
            'empleado_id' => 13, // Asegúrate que exista
        ]);
    }
}
