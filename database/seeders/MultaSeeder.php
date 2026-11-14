<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MultaSeeder extends Seeder
{
    public function run(): void
    {
        // Obtenemos el usuario y las placas existentes de forma dinámica
        $usuario = DB::table('users')->first();
        $documento = $usuario ? $usuario->documento_identidad : '01234567-8';

        $vehiculos = DB::table('vehiculos')->pluck('placa')->toArray();
        $placa1 = $vehiculos[0] ?? 'P123-456';
        $placa2 = $vehiculos[1] ?? ($vehiculos[0] ?? 'PFAK3420');

        DB::table('multas')->insert([
            [
                'descripcion' => 'Estacionarse en eje preferencial',
                'documento_infractor' => $documento,
                'estado_pago' => 'Pendiente',
                'fecha_infraccion' => '2026-11-07 15:35:36',
                'monto' => 11.43,
                'placa_vehiculo' => $placa1,
            ],
            [
                'descripcion' => 'Exceso de velocidad detectado por radar',
                'documento_infractor' => $documento,
                'estado_pago' => 'Pendiente',
                'fecha_infraccion' => '2026-11-10 15:35:36',
                'monto' => 57.14,
                'placa_vehiculo' => $placa2,
            ],
        ]);
    }
}