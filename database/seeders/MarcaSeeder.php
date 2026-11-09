<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MarcaSeeder extends Seeder
{
    public function run(): void
    {
        $marcas = [
            ['nombre_marca' => 'Chevrolet'],
            ['nombre_marca' => 'Kia'],
            ['nombre_marca' => 'Hyundai'],
            ['nombre_marca' => 'Ford'],
            ['nombre_marca' => 'Toyota'],
            ['nombre_marca' => 'Nissan'],
            ['nombre_marca' => 'Hino'],
        ];

        DB::table('marcas')->insert($marcas);
    }
}
