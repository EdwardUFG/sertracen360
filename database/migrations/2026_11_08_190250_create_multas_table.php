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
        Schema::create('multas', function (Blueprint $table) {
            $table->id('id_multa');

            $table->string('placa_vehiculo');
            $table->foreign('placa_vehiculo')->references('placa')->on('vehiculos');

            $table->string('documento_infractor')->nullable();
            $table->foreign('documento_infractor')
                ->references('documento_identidad')
                ->on('users');

            $table->text('descripcion');
            $table->decimal('monto', 8, 2);
            $table->string('estado_pago')->default('Pendiente');
            $table->date('fecha_infraccion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('multas');
    }
};
