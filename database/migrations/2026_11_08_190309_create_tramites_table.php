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
        Schema::create('tramites', function (Blueprint $table) {
            $table->id('id_tramite');

            $table->string('documento_solicitante');
            $table->foreign('documento_solicitante')
                ->references('documento_identidad')
                ->on('users');

            $table->string('placa_vehiculo')->nullable();
            $table->foreign('placa_vehiculo')->references('placa')->on('vehiculos');

            $table->string('documento_licencia')->nullable();
            $table->foreign('documento_licencia')
                ->references('documento_titular')
                ->on('licencias');

            $table->string('tipo_tramite');
            $table->string('estado_tramite')->default('En Proceso');
            $table->date('fecha_solicitud');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tramites');
    }
};
