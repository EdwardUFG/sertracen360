<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SucursalSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('sucursales')->insert([
            ['nombre_sucursal' => 'Sertracen Las Cascadas', 'direccion' => 'Centro Comercial Las Cascadas, San Salvador'],
            ['nombre_sucursal' => 'Sertracen Santa Ana', 'direccion' => 'Plaza Antigua, Santa Ana'],
            ['nombre_sucursal' => 'Sertracen San Miguel', 'direccion' => 'Plaza Goldtree, San Miguel'],
        ]);
    }
}
