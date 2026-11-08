<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TraspasoController extends Controller
{
    public function index()
    {
        return Inertia::render('Traspasos/Index');
    }
}
