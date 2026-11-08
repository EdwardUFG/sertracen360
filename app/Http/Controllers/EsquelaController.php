<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class EsquelaController extends Controller
{
    public function index()
    {
        return Inertia::render('Esquelas/Index');
    }
}
