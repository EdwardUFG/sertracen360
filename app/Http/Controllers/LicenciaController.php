<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class LicenciaController extends Controller
{
    public function index()
    {
        return Inertia::render('Licencias/Index');
    }
}
