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

        Schema::create('horarios', function (Blueprint $table) {
            $table->id();
            $table->string('Lunes', 100);
            $table->string('Martes', 100);
            $table->string('Miercoles', 100);
            $table->string('Jueves', 100);
            $table->string('Viernes', 100);
            $table->string('Sabado', 100);
            $table->string('Domingo', 100);
            $table->date('Inicio_Semana');
            $table->foreignId('supermercado_id')->constrained()->onDelete('cascade');
            $table->foreignId('empleado_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('horarios');
    }
};