<?php

namespace Database\Seeders;

use App\Models\Empleado;
use Illuminate\Database\Seeder;

class EmpleadoSeeder extends Seeder
{
    public function run(): void
    {
        // SUPERMERCADO 1
        Empleado::create([
            'DNI' => '12345678A',
            'Nombre' => 'Joel',
            'Apellidos' => 'Lopez',
            'Telefono' => '600000001',
            'Turno' => '07:30 - 15:30',
            'Horas_Semanales' => '40',
            'Dia_Libre' => 'Sabado',
            'Rotativo' => false,
            'Turno_Rotativo' => '',
            'Especial' => true,
            'Email' => 'joel.lopez@gmail.com',
            'supermercado_id' => "1",
        ]);

        Empleado::create([
            'DNI' => '23456789B',
            'Nombre' => 'Walter',
            'Apellidos' => 'Martinez',
            'Telefono' => '600000002',
            'Turno' => '07:30 - 12:30',
            'Horas_Semanales' => '25',
            'Dia_Libre' => 'Domingo',
            'Rotativo' => false,
            'Turno_Rotativo' => '',
            'Especial' => false,
            'Email' => 'walter.m@gmail.com',
            'supermercado_id' => "1",
        ]);

        Empleado::create([
            'DNI' => '34567890C',
            'Nombre' => 'Ana Maria',
            'Apellidos' => 'Gomez',
            'Telefono' => '600000003',
            'Turno' => '14:15 - 22:15',
            'Horas_Semanales' => '40',
            'Dia_Libre' => 'Lunes',
            'Rotativo' => true,
            'Turno_Rotativo' => '07:30 - 15:30',
            'Especial' => false,
            'Email' => 'ana.gomez@gmail.com',
            'supermercado_id' => "1",
        ]);

        // SUPERMERCADO 2
        Empleado::create([
            'DNI' => '45678901D',
            'Nombre' => 'Laura',
            'Apellidos' => 'Fernandez',
            'Telefono' => '600000004',
            'Turno' => '08:00 - 14:00',
            'Horas_Semanales' => '30',
            'Dia_Libre' => 'Martes',
            'Rotativo' => true,
            'Turno_Rotativo' => '14:00 - 20:00',
            'Especial' => false,
            'Email' => 'laura.fernandez@gmail.com',
            'supermercado_id' => "2",
        ]);

        Empleado::create([
            'DNI' => '56789012E',
            'Nombre' => 'Carlos',
            'Apellidos' => 'Ruiz',
            'Telefono' => '600000005',
            'Turno' => '16:00 - 22:00',
            'Horas_Semanales' => '30',
            'Dia_Libre' => 'Viernes',
            'Rotativo' => false,
            'Turno_Rotativo' => '',
            'Especial' => false,
            'Email' => 'carlos.ruiz@gmail.com',
            'supermercado_id' => "2",
        ]);

        Empleado::create([
            'DNI' => '67890123F',
            'Nombre' => 'Sandra',
            'Apellidos' => 'Martinez',
            'Telefono' => '600000006',
            'Turno' => '14:15 - 22:15',
            'Horas_Semanales' => '40',
            'Dia_Libre' => 'Jueves',
            'Rotativo' => true,
            'Turno_Rotativo' => '07:00 - 15:00',
            'Especial' => false,
            'Email' => 'sandra.martinez@gmail.com',
            'supermercado_id' => "2",
        ]);

        // SUPERMERCADO 3
        Empleado::create([
            'DNI' => '78901234G',
            'Nombre' => 'Manuel',
            'Apellidos' => 'Sanchez',
            'Telefono' => '600000007',
            'Turno' => '06:00 - 14:00',
            'Horas_Semanales' => '40',
            'Dia_Libre' => 'Domingo',
            'Rotativo' => false,
            'Turno_Rotativo' => '',
            'Especial' => true,
            'Email' => 'manuel.sanchez@gmail.com',
            'supermercado_id' => "3",
        ]);

        Empleado::create([
            'DNI' => '89012345H',
            'Nombre' => 'Lucia',
            'Apellidos' => 'Navarro',
            'Telefono' => '600000008',
            'Turno' => '17:00 - 22:00',
            'Horas_Semanales' => '25',
            'Dia_Libre' => 'Miercoles',
            'Rotativo' => true,
            'Turno_Rotativo' => '07:30 - 12:30',
            'Especial' => false,
            'Email' => 'lucia.navarro@gmail.com',
            'supermercado_id' => "3",
        ]);

        Empleado::create([
            'DNI' => '90123456I',
            'Nombre' => 'Diego',
            'Apellidos' => 'Morales',
            'Telefono' => '600000009',
            'Turno' => '13:00 - 21:00',
            'Horas_Semanales' => '35',
            'Dia_Libre' => 'Sabado',
            'Rotativo' => false,
            'Turno_Rotativo' => '',
            'Especial' => false,
            'Email' => 'diego.morales@gmail.com',
            'supermercado_id' => "3",
        ]);

        Empleado::create([
            'DNI' => '91234567J',
            'Nombre' => 'Pilar',
            'Apellidos' => 'Lozano',
            'Telefono' => '600000010',
            'Turno' => '07:30 - 15:30',
            'Horas_Semanales' => '40',
            'Dia_Libre' => 'Domingo',
            'Rotativo' => false,
            'Turno_Rotativo' => '',
            'Especial' => true,
            'Email' => 'pilar.lozano@gmail.com',
            'supermercado_id' => "1",
        ]);

        Empleado::create([
            'DNI' => '92345678K',
            'Nombre' => 'Mario',
            'Apellidos' => 'Delgado',
            'Telefono' => '600000011',
            'Turno' => '15:30 - 22:30',
            'Horas_Semanales' => '35',
            'Dia_Libre' => 'Lunes',
            'Rotativo' => true,
            'Turno_Rotativo' => '07:30 - 13:30',
            'Especial' => false,
            'Email' => 'mario.delgado@gmail.com',
            'supermercado_id' => "1",
        ]);

        // SUPERMERCADO 2
        Empleado::create([
            'DNI' => '93456789L',
            'Nombre' => 'Raquel',
            'Apellidos' => 'Carrasco',
            'Telefono' => '600000012',
            'Turno' => '08:00 - 14:00',
            'Horas_Semanales' => '30',
            'Dia_Libre' => 'Martes',
            'Rotativo' => true,
            'Turno_Rotativo' => '16:00 - 22:00',
            'Especial' => false,
            'Email' => 'raquel.carrasco@gmail.com',
            'supermercado_id' => "2",
        ]);

        Empleado::create([
            'DNI' => '94567890M',
            'Nombre' => 'Alvaro',
            'Apellidos' => 'Serrano',
            'Telefono' => '600000013',
            'Turno' => '13:30 - 21:30',
            'Horas_Semanales' => '40',
            'Dia_Libre' => 'Viernes',
            'Rotativo' => false,
            'Turno_Rotativo' => '',
            'Especial' => true,
            'Email' => 'alvaro.serrano@gmail.com',
            'supermercado_id' => "2",
        ]);

        Empleado::create([
            'DNI' => '95678901N',
            'Nombre' => 'Elena',
            'Apellidos' => 'Jimenez',
            'Telefono' => '600000014',
            'Turno' => '14:00 - 20:00',
            'Horas_Semanales' => '30',
            'Dia_Libre' => 'Jueves',
            'Rotativo' => true,
            'Turno_Rotativo' => '08:00 - 14:00',
            'Especial' => false,
            'Email' => 'elena.jimenez@gmail.com',
            'supermercado_id' => "2",
        ]);

        // SUPERMERCADO 3
        Empleado::create([
            'DNI' => '96789012O',
            'Nombre' => 'Tomas',
            'Apellidos' => 'Iglesias',
            'Telefono' => '600000015',
            'Turno' => '06:00 - 14:00',
            'Horas_Semanales' => '40',
            'Dia_Libre' => 'Sabado',
            'Rotativo' => false,
            'Turno_Rotativo' => '',
            'Especial' => true,
            'Email' => 'tomas.iglesias@gmail.com',
            'supermercado_id' => "3",
        ]);

        Empleado::create([
            'DNI' => '97890123P',
            'Nombre' => 'Isabel',
            'Apellidos' => 'Herrera',
            'Telefono' => '600000016',
            'Turno' => '17:00 - 22:00',
            'Horas_Semanales' => '25',
            'Dia_Libre' => 'Miercoles',
            'Rotativo' => true,
            'Turno_Rotativo' => '08:00 - 13:00',
            'Especial' => false,
            'Email' => 'isabel.herrera@gmail.com',
            'supermercado_id' => "3",
        ]);

        Empleado::create([
            'DNI' => '98901234Q',
            'Nombre' => 'Francisco',
            'Apellidos' => 'Dominguez',
            'Telefono' => '600000017',
            'Turno' => '13:00 - 21:00',
            'Horas_Semanales' => '35',
            'Dia_Libre' => 'Lunes',
            'Rotativo' => false,
            'Turno_Rotativo' => '',
            'Especial' => false,
            'Email' => 'francisco.dominguez@gmail.com',
            'supermercado_id' => "3",
        ]);

        Empleado::create([
            'DNI' => '99012345R',
            'Nombre' => 'Beatriz',
            'Apellidos' => 'Moreno',
            'Telefono' => '600000018',
            'Turno' => '15:00 - 21:00',
            'Horas_Semanales' => '30',
            'Dia_Libre' => 'Martes',
            'Rotativo' => true,
            'Turno_Rotativo' => '08:00 - 14:00',
            'Especial' => false,
            'Email' => 'beatriz.moreno@gmail.com',
            'supermercado_id' => "3",
        ]);
    }
}
