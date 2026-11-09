<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MultaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('multas')->insert([
            [
                'placa_vehiculo' => 'P123-456',
                'documento_infractor' => '01234567-8',
                'descripcion' => 'Estacionarse en eje preferencial',
                'monto' => 11.43,
                'estado_pago' => 'Pendiente',
                'fecha_infraccion' => Carbon::now()->subDays(5),
            ],
            [
                'placa_vehiculo' => 'C111-222',
                'documento_infractor' => null,
                'descripcion' => 'Exceso de velocidad detectado por radar',
                'monto' => 57.14,
                'estado_pago' => 'Pendiente',
                'fecha_infraccion' => Carbon::now()->subDays(2),
            ],
        ]);
    }
}
