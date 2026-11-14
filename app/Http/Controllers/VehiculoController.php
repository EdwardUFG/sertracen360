<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VehiculoController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Extraer los vehículos del titular logueado incluyendo marca y multas pendientes
        $vehiculos = Vehiculo::with(['marca', 'multas' => function ($query) {
                $query->where('estado_pago', 'Pendiente');
            }])
            ->where('documento_propietario', $user->documento_identidad)
            ->get()
            ->map(function ($vehiculo) {
                $vehiculo->tiene_multas_pendientes = $vehiculo->multas->isNotEmpty();
                return $vehiculo;
            });

        return Inertia::render('Vehiculos/Index', [
            'vehiculos' => $vehiculos,
        ]);
    }

    public function refrendar(Request $request, Vehiculo $vehiculo)
    {
        // Regla estricta de seguridad: Validar que el vehículo pertenezca al usuario autenticado
        if ($vehiculo->documento_propietario !== Auth::user()->documento_identidad) {
            abort(403, 'No tienes autorización para refrendar este vehículo.');
        }

        // Regla institucional estricta: Bloquear si posee multas con estado_pago Pendiente
        $tieneMultasPendientes = $vehiculo->multas()->where('estado_pago', 'Pendiente')->exists();

        if ($tieneMultasPendientes) {
            return redirect()->back()->withErrors([
                'error' => 'No se puede realizar la refrenda de la tarjeta de circulación porque el vehículo posee multas pendientes.'
            ]);
        }

        // Procesar la refrenda si está solvente
        $vehiculo->update([
            'estado' => 'Refrendado',
        ]);

        return redirect()->back()->with('success', 'Refrenda de tarjeta de circulación realizada con éxito.');
    }
}
