<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TraspasoController extends Controller
{
   public function store(Request $request)
{
    $request->validate([
        'placa' => 'required|string|exists:vehiculos,placa',
        'nuevo_propietario_dni' => 'required|string|exists:users,documento_identidad',
    ]);

    $user = auth()->user();
    $vehiculo = Vehiculo::where('placa', $request->placa)->first();

    // 1. Validar propiedad del vehículo
    if ($vehiculo->documento_propietario !== $user->documento_identidad) {
        return back()->withErrors(['error' => 'No autorizado: El vehículo no pertenece al usuario autenticado.']);
    }

    // 2. Validar estado y multas pendientes
    if ($vehiculo->estado !== 'Activo' || $vehiculo->tiene_multas_pendientes) {
        return back()->withErrors(['error' => 'El trámite está bloqueado debido a multas pendientes o estado inactivo.']);
    }

    // 3. Ejecutar la transacción de traspaso de dominio
    DB::transaction(function () use ($vehiculo, $request) {
        $vehiculo->update([
            'documento_propietario' => $request->nuevo_propietario_dni,
        ]);
    });

    // 4. Redirección correcta hacia el index para mostrar el mensaje flash
    return redirect()->route('traspasos.index')->with('success', 'Traspaso de dominio registrado y procesado con éxito.');
}
}
