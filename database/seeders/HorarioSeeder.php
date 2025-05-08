<?php

namespace Database\Seeders;

use App\Models\Horario;
use Illuminate\Database\Seeder;

class HorarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Horario::factory()->count(20)->create();

        Horario::create([
            'Lunes' => '07:30 - 15:30',
            'Martes' => '07:30 - 15:30',
            'Miercoles' => '07:30 - 15:30',
            'Jueves' => '07:30 - 15:30',
            'Viernes' => '07:30 - 15:30',
            'Sabado' => 'Libre',
            'Domingo' => 'Libre',
            'Inicio_Semana' => '2025-05-05',
            'supermercado_id' => 1,
            'empleado_id' => 1,
        ]);

        Horario::create([
            'Lunes' => '07:30 - 12:30',
            'Martes' => '07:30 - 12:30',
            'Miercoles' => '07:30 - 12:30',
            'Jueves' => '07:30 - 12:30',
            'Viernes' => '07:30 - 12:30',
            'Sabado' => 'Libre',
            'Domingo' => 'Libre',
            'Inicio_Semana' => '2025-05-05',
            'supermercado_id' => 1,
            'empleado_id' => 2,
        ]);

        Horario::create([
            'Lunes' => '14:15 - 22:15',
            'Martes' => '14:15 - 22:15',
            'Miercoles' => 'Libre',
            'Jueves' => 'Libre',
            'Viernes' => '14:15 - 22:15',
            'Sabado' => '14:15 - 22:15',
            'Domingo' => '14:15 - 22:15',
            'Inicio_Semana' => '2025-05-05',
            'supermercado_id' => 1,
            'empleado_id' => 3,
        ]);

        Horario::create([
            'Lunes' => 'Libre',
            'Martes' => 'Libre',
            'Miercoles' => '14:15 - 22:15',
            'Jueves' => '14:15 - 22:15',
            'Viernes' => '14:15 - 22:15',
            'Sabado' => '14:15 - 22:15',
            'Domingo' => '14:15 - 22:15',
            'Inicio_Semana' => '2025-05-05',
            'supermercado_id' => 1,
            'empleado_id' => 4,
        ]);

        Horario::create([
            'Lunes' => '16:15 - 22:15',
            'Martes' => '16:15 - 22:15',
            'Miercoles' => '16:15 - 22:15',
            'Jueves' => 'Libre',
            'Viernes' => 'Libre',
            'Sabado' => '16:15 - 22:15',
            'Domingo' => '16:15 - 22:15',
            'Inicio_Semana' => '2025-05-05',
            'supermercado_id' => 1,
            'empleado_id' => 5,
        ]);

        Horario::create([
            'Lunes' => 'Vacaciones',
            'Martes' => 'Vacaciones',
            'Miercoles' => 'Vacaciones',
            'Jueves' => 'Vacaciones',
            'Viernes' => 'Vacaciones',
            'Sabado' => 'Vacaciones',
            'Domingo' => 'Vacaciones',
            'Inicio_Semana' => '2025-05-05',
            'supermercado_id' => 1,
            'empleado_id' => 6,
        ]);

        Horario::create([
            'Lunes' => '14:15 - 22:15',
            'Martes' => 'Libre',
            'Miercoles' => 'Libre',
            'Jueves' => '14:15 - 22:15',
            'Viernes' => '14:15 - 22:15',
            'Sabado' => '14:15 - 22:15',
            'Domingo' => '14:15 - 22:15',
            'Inicio_Semana' => '2025-05-05',
            'supermercado_id' => 1,
            'empleado_id' => 7,
        ]);

        Horario::create([
            'Lunes' => '16:15 - 22:15',
            'Martes' => '16:15 - 22:15',
            'Miercoles' => '16:15 - 22:15',
            'Jueves' => 'Libre',
            'Viernes' => 'Libre',
            'Sabado' => '16:15 - 22:15',
            'Domingo' => '16:15 - 22:15',
            'Inicio_Semana' => '2025-05-05',
            'supermercado_id' => 1,
            'empleado_id' => 8,
        ]);

        Horario::create([
            'Lunes' => 'Libre',
            'Martes' => 'Libre',
            'Miercoles' => '17:15 - 22:15',
            'Jueves' => '17:15 - 22:15',
            'Viernes' => '17:15 - 22:15',
            'Sabado' => '17:15 - 22:15',
            'Domingo' => '17:15 - 22:15',
            'Inicio_Semana' => '2025-05-05',
            'supermercado_id' => 1,
            'empleado_id' => 9,
        ]);

        // -----------

        Horario::create([
            'Lunes' => '07:30 - 15:30',
            'Martes' => '07:30 - 15:30',
            'Miercoles' => '07:30 - 15:30',
            'Jueves' => '07:30 - 15:30',
            'Viernes' => '07:30 - 15:30',
            'Sabado' => 'Libre',
            'Domingo' => 'Libre',
            'Inicio_Semana' => '2025-04-28',
            'supermercado_id' => 1,
            'empleado_id' => 1,
        ]);

        Horario::create([
            'Lunes' => 'Libre',
            'Martes' => 'Libre',
            'Miercoles' => '07:30 - 12:30',
            'Jueves' => '07:30 - 12:30',
            'Viernes' => '07:30 - 12:30',
            'Sabado' => '12:30 - 17:30',
            'Domingo' => '12:30 - 17:30',
            'Inicio_Semana' => '2025-04-28',
            'supermercado_id' => 1,
            'empleado_id' => 2,
        ]);

        Horario::create([
            'Lunes' => '07:30 - 15:30',
            'Martes' => '07:30 - 15:30',
            'Miercoles' => 'Libre',
            'Jueves' => 'Libre',
            'Viernes' => '07:30 - 15:30',
            'Sabado' => '14:15 - 22:15',
            'Domingo' => '14:15 - 22:15',
            'Inicio_Semana' => '2025-04-28',
            'supermercado_id' => 1,
            'empleado_id' => 3,
        ]);

        Horario::create([
            'Lunes' => '14:15 - 22:15',
            'Martes' => 'Libre',
            'Miercoles' => 'Libre',
            'Jueves' => '14:15 - 22:15',
            'Viernes' => '14:15 - 22:15',
            'Sabado' => '07:30 - 15:30',
            'Domingo' => '07:30 - 15:30',
            'Inicio_Semana' => '2025-04-28',
            'supermercado_id' => 1,
            'empleado_id' => 4,
        ]);

        Horario::create([
            'Lunes' => '08:00 - 14:00',
            'Martes' => '11:15 - 17:15',
            'Miercoles' => '08:00 - 14:00',
            'Jueves' => 'Libre',
            'Viernes' => 'Libre',
            'Sabado' => '15:30 - 21:30 ',
            'Domingo' => '16:15 -22:15',
            'Inicio_Semana' => '2025-04-28',
            'supermercado_id' => 1,
            'empleado_id' => 5,
        ]);

        Horario::create([
            'Lunes' => 'Libre',
            'Martes' => 'Libre',
            'Miercoles' => '14:15 - 22:15',
            'Jueves' => '14:15 - 22:15',
            'Viernes' => '12:30 - 20:30',
            'Sabado' => '14:15 - 22:15',
            'Domingo' => 'Vacaciones',
            'Inicio_Semana' => '2025-04-28',
            'supermercado_id' => 1,
            'empleado_id' => 6,
        ]);

        Horario::create([
            'Lunes' => '14:15 - 22:15',
            'Martes' => '14:15 - 22:15',
            'Miercoles' => '14:15 - 22:15',
            'Jueves' => '07:30 - 15:30',
            'Viernes' => '14:15 - 22:15',
            'Sabado' => 'Libre',
            'Domingo' => 'Libre',
            'Inicio_Semana' => '2025-04-28',
            'supermercado_id' => 1,
            'empleado_id' => 7,
        ]);

        Horario::create([
            'Lunes' => 'Vacaciones',
            'Martes' => 'Vacaciones',
            'Miercoles' => 'Vacaciones',
            'Jueves' => 'Vacaciones',
            'Viernes' => 'Vacaciones',
            'Sabado' => 'Vacaciones',
            'Domingo' => '07:30 - 15:30 ',
            'Inicio_Semana' => '2025-04-28',
            'supermercado_id' => 1,
            'empleado_id' => 8,
        ]);

        Horario::create([
            'Lunes' => '17:15 - 22:15',
            'Martes' => '17:15 - 22:15',
            'Miercoles' => '17:15 - 22:15',
            'Jueves' => 'Libre',
            'Viernes' => 'Libre',
            'Sabado' => '07:30 - 12:30',
            'Domingo' => '07:30 - 12:30',
            'Inicio_Semana' => '2025-04-28',
            'supermercado_id' => 1,
            'empleado_id' => 9,
        ]);
    }
}
