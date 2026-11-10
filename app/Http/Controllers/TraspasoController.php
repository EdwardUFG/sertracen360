<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use App\Models\Tramite;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class TraspasoController extends Controller
{
    public function index()
    {
        // Buscar por 'documento_propietario' (asumiendo que el usuario logueado tiene un 'documento_identidad')
        $vehiculos = Vehiculo::where('documento_propietario', auth()->user()->documento_identidad)->get();
        
        return Inertia::render('Traspasos/Index', [
            'vehiculos' => $vehiculos
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validar usando la placa en lugar del ID
        $request->validate([
            'placa' => 'required|exists:vehiculos,placa',
            'nuevo_propietario' => ['required', 'regex:/^([0-9]{9}|[0-9]{14})$/'],
        ], [
            'nuevo_propietario.regex' => 'El documento debe ser un DUI (9 dígitos) o NIT (14 dígitos).'
        ]);

        $vehiculo = Vehiculo::findOrFail($request->placa);

        // 2. REGLA: Verificar multas ('estado_pago' == 'Pendiente') y estado del vehículo
        $tieneMultas = $vehiculo->multas()->where('estado_pago', 'Pendiente')->exists();
        $estaBloqueado = $vehiculo->estado !== 'Activo'; 

        if ($tieneMultas || $estaBloqueado) {
            return back()->withErrors([
                'error_tramite' => 'Trámite rechazado: El vehículo posee esquelas pendientes o no se encuentra Activo.'
            ]);
        }

        // 3. REGLA: Transacción de Traspaso
        DB::transaction(function () use ($vehiculo, $request) {
            
            // Registrar el trámite con las columnas de tu migración
            Tramite::create([
                'documento_solicitante' => auth()->user()->documento_identidad, // Quien pide el traspaso
                'placa_vehiculo' => $vehiculo->placa,
                'tipo_tramite' => 'Traspaso de Dominio',
                'estado_tramite' => 'Finalizado',
                'fecha_solicitud' => now(),
            ]);

            // Cambiar el dueño del vehículo
            $vehiculo->update([
                'documento_propietario' => $request->nuevo_propietario
            ]);
            
        });

        return redirect()->route('dashboard')->with('success', 'Traspaso aprobado exitosamente.');
    }
}