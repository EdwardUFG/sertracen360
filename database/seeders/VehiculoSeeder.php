<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehiculoSeeder extends Seeder
{
    public function run(): void
    {
        // Obtenemos el primer usuario disponible para usar su documento de identidad de forma segura
        $primerUsuario = DB::table('users')->first();
        $documentoPropietario = $primerUsuario ? $primerUsuario->documento_identidad : '01234567-8';

        DB::table('vehiculos')->insert([
            [
                'placa' => 'PFAK3420',
                'documento_propietario' => $documentoPropietario,
                'id_marca' => 1,
                'modelo' => 'LANCER',
                'anio' => 2017,
                'tipo_vehiculo' => 'SEDAN',
                'clase' => 'AUTOMOVIL',
                'capacidad' => '5.00',
                'dominio' => 'PROPIEDAD',
                'en_calidad' => 'PROPIEDAD',
                'color' => 'NEGRO',
                'numero_chasis' => 'CHS7X9A42QK881',
                'numero_motor' => 'MTRZP49931FAKE',
                'vin' => '1FAKE9X7K0M123456',
                'estado' => 'Refrendado',
                'fecha_emision' => '2026-05-25',
                'fecha_vencimiento' => '2029-05',
                'tiene_multas_pendientes' => false,
            ],
            [
                'placa' => 'P852-123',
                'documento_propietario' => $documentoPropietario,
                'id_marca' => 2,
                'modelo' => 'TRAILBLAZER',
                'anio' => 2021,
                'tipo_vehiculo' => 'SUV',
                'clase' => 'AUTOMOVIL',
                'capacidad' => '5.00',
                'dominio' => 'PROPIEDAD',
                'en_calidad' => 'PROPIEDAD',
                'color' => 'BLANCO',
                'numero_chasis' => 'CHS8Y1B53RL992',
                'numero_motor' => 'MTRTR88421FAKE',
                'vin' => '2FAKE0Y8L1N654321',
                'estado' => 'Activo',
                'fecha_emision' => '2025-03-10',
                'fecha_vencimiento' => '2028-03',
                'tiene_multas_pendientes' => true, // Simula el bloqueo por multas en la vista
            ],
            [
                'placa' => 'P123-456',
                'documento_propietario' => $documentoPropietario,
                'id_marca' => 3,
                'modelo' => 'FORTE',
                'anio' => 2023,
                'tipo_vehiculo' => 'SEDAN',
                'clase' => 'AUTOMOVIL',
                'capacidad' => '5.00',
                'dominio' => 'PROPIEDAD',
                'en_calidad' => 'PROPIEDAD',
                'color' => 'GRIS',
                'numero_chasis' => 'CHS9Z2C64SM003',
                'numero_motor' => 'MTRFR77312FAKE',
                'vin' => '3FAKE1Z9M2P789012',
                'estado' => 'Refrendado',
                'fecha_emision' => '2024-01-15',
                'fecha_vencimiento' => '2027-01',
                'tiene_multas_pendientes' => false,
            ],
        ]);
    }
}