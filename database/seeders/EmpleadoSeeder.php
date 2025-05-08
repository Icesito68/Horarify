<?php

namespace Database\Seeders;

use App\Models\Empleado;
use Illuminate\Database\Seeder;

class EmpleadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Empleado::factory()->count(8)->create();

        Empleado::create([
            'DNI' => '78787878F',
            'Nombre' => 'Joel',
            'Apellidos' => 'Lopez',
            'Telefono' => '606606606',
            'Turno' => '07:30 - 15:30',
            'Horas_Semanales' => '40',
            'Dia_Libre' => 'Sabado',
            'Rotativo' => False,
            'Turno_Rotativo' => '',
            'Especial' => True,
            'Email' => 'gmail@gmail.com',
            'supermercado_id' => "1",
        ]);

        Empleado::create([
            'DNI' => '78787878F',
            'Nombre' => 'Walter',
            'Apellidos' => 'Lopez',
            'Telefono' => '606606606',
            'Turno' => '07:30 - 12:30',
            'Horas_Semanales' => '25',
            'Dia_Libre' => 'Sabado',
            'Rotativo' => False,
            'Turno_Rotativo' => '',
            'Especial' => False,
            'Email' => 'gmail@gmail.com',
            'supermercado_id' => "1",
        ]);

        Empleado::create([
            'DNI' => '78787878F',
            'Nombre' => 'Cande',
            'Apellidos' => 'Lopez',
            'Telefono' => '606606606',
            'Turno' => '14:15 - 22:15',
            'Horas_Semanales' => '40',
            'Dia_Libre' => 'Miercoles',
            'Rotativo' => True,
            'Turno_Rotativo' => '07:30 - 15:30',
            'Especial' => False,
            'Email' => 'gmail@gmail.com',
            'supermercado_id' => "1",
        ]);

        Empleado::create([
            'DNI' => '78787878F',
            'Nombre' => 'Ana Maria',
            'Apellidos' => 'Lopez',
            'Telefono' => '606606606',
            'Turno' => '14:15 - 22:15',
            'Horas_Semanales' => '40',
            'Dia_Libre' => 'Lunes',
            'Rotativo' => True,
            'Turno_Rotativo' => '07:30 - 15:30',
            'Especial' => False,
            'Email' => 'gmail@gmail.com',
            'supermercado_id' => "1",
        ]);

        Empleado::create([
            'DNI' => '78787878F',
            'Nombre' => 'Gabriel',
            'Apellidos' => 'Lopez',
            'Telefono' => '606606606',
            'Turno' => '16:15 - 22:15',
            'Horas_Semanales' => '30',
            'Dia_Libre' => 'Jueves',
            'Rotativo' => True,
            'Turno_Rotativo' => '08:00 - 14:00',
            'Especial' => False,
            'Email' => 'gmail@gmail.com',
            'supermercado_id' => "1",
        ]);

        Empleado::create([
            'DNI' => '78787878F',
            'Nombre' => 'Pedro',
            'Apellidos' => 'Lopez',
            'Telefono' => '606606606',
            'Turno' => '14:15 - 22:15',
            'Horas_Semanales' => '40',
            'Dia_Libre' => 'Martes',
            'Rotativo' => True,
            'Turno_Rotativo' => '07:30 - 15:30',
            'Especial' => False,
            'Email' => 'gmail@gmail.com',
            'supermercado_id' => "1",
        ]);

        Empleado::create([
            'DNI' => '78787878F',
            'Nombre' => 'Gabriela',
            'Apellidos' => 'Lopez',
            'Telefono' => '606606606',
            'Turno' => '14:15 - 22:15',
            'Horas_Semanales' => '40',
            'Dia_Libre' => 'Martes',
            'Rotativo' => True,
            'Turno_Rotativo' => '07:30 - 15:30',
            'Especial' => False,
            'Email' => 'gmail@gmail.com',
            'supermercado_id' => "1",
        ]);

        Empleado::create([
            'DNI' => '78787878F',
            'Nombre' => 'Daniel',
            'Apellidos' => 'Lopez',
            'Telefono' => '606606606',
            'Turno' => '16:15 - 22:15',
            'Horas_Semanales' => '30',
            'Dia_Libre' => 'Jueves',
            'Rotativo' => True,
            'Turno_Rotativo' => '07:30 - 13:30',
            'Especial' => False,
            'Email' => 'gmail@gmail.com',
            'supermercado_id' => "1",
        ]);

        Empleado::create([
            'DNI' => '78787878F',
            'Nombre' => '25 horas X',
            'Apellidos' => 'Lopez',
            'Telefono' => '606606606',
            'Turno' => '17:15 - 22:15',
            'Horas_Semanales' => '25',
            'Dia_Libre' => 'Lunes',
            'Rotativo' => True,
            'Turno_Rotativo' => '7:30 - 12:30',
            'Especial' => False,
            'Email' => 'gmail@gmail.com',
            'supermercado_id' => "1",
        ]);
    }
}
