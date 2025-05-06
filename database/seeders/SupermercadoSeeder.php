<?php

namespace Database\Seeders;

use App\Models\Supermercado;
use App\Models\User;
use Illuminate\Database\Seeder;

class SupermercadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Supermercado::factory()->count(1)->create();
        // $user = User::factory()->create();  // Crear un usuario (o usar uno existente)
        
        Supermercado::create([
            'Nombre' => 'Suma Playa La Arena',
            'Direccion' => 'Av. Marítima Puerto de Santiago',
            'NIF' => '12345678A',
            'user_id' => "1",
        ]);

        Supermercado::create([
            'Nombre' => 'Suma Ravelo',
            'Direccion' => 'C. Real Orotava',
            'NIF' => '87654321B',
            'user_id' => "1",
        ]);

        Supermercado::create([
            'Nombre' => 'Suma La Quinta',
            'Direccion' => 'C. Bicacarera',
            'NIF' => '11223344C',
            'user_id' => "1",
        ]);
    
    }
}