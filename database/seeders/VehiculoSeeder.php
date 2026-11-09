<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehiculoSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('vehiculos')->insert([
            [
                'placa' => 'P852-123',
                'documento_propietario' => '01234567-8',
                'id_marca' => 1,
                'modelo' => 'Trailblazer',
                'anio' => 2021,
                'tipo_vehiculo' => 'Particular',
            ],
            [
                'placa' => 'P123-456',
                'documento_propietario' => '01234567-8',
                'id_marca' => 2,
                'modelo' => 'Forte',
                'anio' => 2023,
                'tipo_vehiculo' => 'Particular',
            ],
            [
                'placa' => 'P987-654',
                'documento_propietario' => '01234567-8',
                'id_marca' => 3,
                'modelo' => 'Elantra',
                'anio' => 2022,
                'tipo_vehiculo' => 'Particular',
            ],
            [
                'placa' => 'P456-789',
                'documento_propietario' => '01234567-8',
                'id_marca' => 4,
                'modelo' => 'Fiesta',
                'anio' => 2019,
                'tipo_vehiculo' => 'Particular',
            ],
            [
                'placa' => 'C111-222',
                'documento_propietario' => '0614-010190-101-1',
                'id_marca' => 7,
                'modelo' => 'Serie 300',
                'anio' => 2020,
                'tipo_vehiculo' => 'Carga',
            ],
        ]);
    }
}
