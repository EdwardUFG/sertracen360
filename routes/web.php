
<?php

use App\Http\Controllers\EsquelaController;
use App\Http\Controllers\LicenciaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TraspasoController;
use App\Http\Controllers\VehiculoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/esquelas', [EsquelaController::class, 'index'])
        ->name('esquelas.index');

    Route::get('/vehiculos', [VehiculoController::class, 'index'])
        ->name('vehiculos.index');

    // Módulo de Licencias - Integrante 3
    Route::get('/licencias', [LicenciaController::class, 'index'])
        ->name('licencias.index');

    Route::post('/licencias/refrenda', [LicenciaController::class, 'refrendar'])
        ->name('licencias.refrenda');

    Route::get('/traspasos', [TraspasoController::class, 'index'])
        ->name('traspasos.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

require __DIR__.'/auth.php';
