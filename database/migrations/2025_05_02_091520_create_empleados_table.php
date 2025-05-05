<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('empleados', function (Blueprint $table) {
            $table->id();
            $table->string('DNI', 9);
            $table->string('Nombre', 50);
            $table->string('Apellidos', 75);
            $table->string('Telefono', 9)->nullable();
            $table->string('Turno', 25);
            $table->string('Horas_Semanales');
            $table->enum('Dia_Libre', ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]);
            $table->boolean('Rotativo');
            $table->string('Turno_Rotativo', 25)->nullable();
            $table->boolean('Especial');
            $table->string('Email');
            $table->foreignId('supermercado_id')->constrained();
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};