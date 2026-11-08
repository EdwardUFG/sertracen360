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
        Schema::create('licencias', function (Blueprint $table) {
            $table->string('documento_titular')->primary();
            $table->foreign('documento_titular')
                ->references('documento_identidad')
                ->on('users')
                ->onDelete('cascade');

            $table->string('tipo_licencia');
            $table->date('fecha_emision');
            $table->date('fecha_vencimiento');
            $table->string('estado')->default('Vigente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('licencias');
    }
};
