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
        $vehiculos = Vehiculo::with(['multas' => function ($query) {
                $query->whereRaw('LOWER(estado_pago) = ?', ['pendiente']);
            }])
            ->where('documento_propietario', auth()->user()->documento_identidad)
            ->get()
            ->map(function ($vehiculo) {
                $vehiculo->tiene_multas_pendientes = $vehiculo->multas->isNotEmpty();
                return $vehiculo;
            });

        return Inertia::render('Traspasos/Index', [
            'vehiculos' => $vehiculos
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'placa' => 'required|exists:vehiculos,placa',
            'nuevo_propietario' => [
                'required',
                'regex:/^([0-9]{9}|[0-9]{14})$/',
                'exists:users,documento_identidad',
            ],
        ], [
            'nuevo_propietario.regex' => 'El documento debe ser un DUI (9 dígitos) o NIT (14 dígitos).',
            'nuevo_propietario.exists' => 'El documento del nuevo propietario no se encuentra registrado en el sistema.',
        ]);

        $usuarioActual = auth()->user()->documento_identidad;

        $vehiculo = Vehiculo::where('placa', $request->placa)
            ->where('documento_propietario', $usuarioActual)
            ->first();

        if (!$vehiculo) {
            return back()->withErrors([
                'error_tramite' => 'Acceso denegado: No eres el propietario registrado de este vehículo.'
            ]);
        }

        if ($request->nuevo_propietario === $usuarioActual) {
            return back()->withErrors([
                'error_tramite' => 'No puedes realizar un traspaso hacia tu mismo documento de identidad.'
            ]);
        }

        $tieneMultas = $vehiculo->multas()
            ->whereRaw('LOWER(estado_pago) = ?', ['pendiente'])
            ->exists();
        $estaBloqueado = strtolower($vehiculo->estado) !== 'activo';

        if ($tieneMultas || $estaBloqueado) {
            return back()->withErrors([
                'error_tramite' => 'Trámite rechazado: El vehículo posee esquelas pendientes o no se encuentra Activo.'
            ]);
        }

        DB::transaction(function () use ($vehiculo, $request, $usuarioActual) {
            Tramite::create([
                'documento_solicitante' => $usuarioActual,
                'placa_vehiculo' => $vehiculo->placa,
                'tipo_tramite' => 'Traspaso de Dominio',
                'estado_tramite' => 'Finalizado',
                'fecha_solicitud' => now(),
            ]);

            $vehiculo->update([
                'documento_propietario' => $request->nuevo_propietario
            ]);
        });

        return redirect()->route('dashboard')->with('success', 'Traspaso aprobado exitosamente.');
    }
}