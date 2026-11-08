<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class VehiculoController extends Controller
{
    public function index()
    {
        return Inertia::render('Vehiculos/Index');
    }
}
