<?php

namespace Database\Seeders;

use App\Models\Festivo;
use Illuminate\Database\Seeder;

class FestivoSeeder extends Seeder
{
    public function run(): void
    {
        $festivos = [
            ['Fecha' => '2025-01-01', 'Nombre' => 'Año Nuevo'],
            ['Fecha' => '2025-01-06', 'Nombre' => 'Día de Reyes'],
            ['Fecha' => '2025-03-20', 'Nombre' => 'Jueves Santo'],
            ['Fecha' => '2025-03-21', 'Nombre' => 'Viernes Santo'],
            ['Fecha' => '2025-05-01', 'Nombre' => 'Día del Trabajador'],
            ['Fecha' => '2025-08-15', 'Nombre' => 'Asunción de la Virgen'],
            ['Fecha' => '2025-10-12', 'Nombre' => 'Fiesta Nacional de España'],
            ['Fecha' => '2025-11-01', 'Nombre' => 'Todos los Santos'],
            ['Fecha' => '2025-12-06', 'Nombre' => 'Día de la Constitución'],
            ['Fecha' => '2025-12-08', 'Nombre' => 'Inmaculada Concepción'],
            ['Fecha' => '2025-12-25', 'Nombre' => 'Navidad'],
        ];

        foreach ([1, 2, 3] as $supermercadoId) {
            foreach ($festivos as $festivo) {
                Festivo::create([
                    'Fecha' => $festivo['Fecha'],
                    'Nombre' => $festivo['Nombre'],
                    'supermercado_id' => $supermercadoId,
                ]);
            }
        }
    }
}
