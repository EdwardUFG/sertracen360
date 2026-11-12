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
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->string('placa')->primary();
            $table->string('documento_propietario');
            $table->foreign('documento_propietario')
                ->references('documento_identidad')
                ->on('users')
                ->onDelete('cascade');

            $table->unsignedBigInteger('id_marca')->nullable();
            $table->foreign('id_marca')->references('id_marca')->on('marcas');

            // Campos técnicos y oficiales de la Tarjeta de Circulación
            $table->string('modelo');
            $table->integer('anio');
            $table->string('color');
            $table->string('clase');
            $table->string('tipo_vehiculo');
            $table->string('capacidad');
            $table->string('dominio');
            $table->string('en_calidad');
            $table->string('numero_chasis')->unique();
            $table->string('numero_motor')->unique();
            $table->string('vin')->unique();
            $table->date('fecha_emision');
            $table->date('fecha_vencimiento');
            $table->string('estado')->default('Activo');
            $table->boolean('tiene_multas_pendientes')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehiculos');
    }
};
