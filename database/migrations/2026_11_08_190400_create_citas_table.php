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
        Schema::create('citas', function (Blueprint $table) {
            $table->id('id_cita');

            $table->string('documento_solicitante');
            $table->foreign('documento_solicitante')
                ->references('documento_identidad')
                ->on('users');

            $table->unsignedBigInteger('id_tramite');
            $table->foreign('id_tramite')->references('id_tramite')->on('tramites');

            $table->unsignedBigInteger('id_sucursal');
            $table->foreign('id_sucursal')->references('id_sucursal')->on('sucursales');

            $table->dateTime('fecha_hora');
            $table->string('estado')->default('Programada');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('citas');
    }
};
