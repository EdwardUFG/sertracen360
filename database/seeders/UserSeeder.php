<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'documento_identidad' => '01234567-8',
                'tipo_persona' => 'Natural',
                'nombres' => 'Edward Fernando',
                'apellidos' => 'Perez Gonzalez',
                'razon_social' => null,
                'correo_electronico' => 'edward@ufg.edu.sv',
                'name' => 'Edward Fernando Perez Gonzalez',
                'email' => 'edward@ufg.edu.sv',
                'password' => Hash::make('password123'),
                'telefono' => '7000-0000',
            ],
            [
                'documento_identidad' => '0614-010190-101-1',
                'tipo_persona' => 'Juridica',
                'nombres' => null,
                'apellidos' => null,
                'razon_social' => 'Siman S.A. de C.V.',
                'correo_electronico' => 'flotilla@siman.com',
                'name' => 'Siman S.A. de C.V.',
                'email' => 'flotilla@siman.com',
                'password' => Hash::make('password123'),
                'telefono' => '2200-0000',
            ],
        ]);
    }
}
