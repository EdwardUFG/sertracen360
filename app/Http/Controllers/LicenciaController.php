<?php

namespace App\Http\Controllers;

use App\Models\Licencia;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LicenciaController extends Controller
{
    /**
     * Consultar la información de la licencia del usuario.
     */
    public function index()
    {
        $usuario = auth()->user();

        $licencia = Licencia::where(
            'documento_titular',
            $usuario->documento_identidad
        )->first();

        $placas = DB::table('vehiculos')
            ->where(
                'documento_propietario',
                $usuario->documento_identidad
            )
            ->pluck('placa');

        // Multas pendientes asociadas directamente al DUI.
        $multasPorDocumento = DB::table('multas')
            ->where(
                'documento_infractor',
                $usuario->documento_identidad
            )
            ->where('estado_pago', 'Pendiente');

        // Fotomultas pendientes sin infractor identificado.
        $multasPorVehiculo = DB::table('multas')
            ->whereIn('placa_vehiculo', $placas)
            ->whereNull('documento_infractor')
            ->where('estado_pago', 'Pendiente');

        $tieneMultasPendientes = $multasPorDocumento->exists()
            || $multasPorVehiculo->exists();

        return Inertia::render('Licencias/Index', [
            'licencia' => $licencia,
            'tipoPersona' => $usuario->tipo_persona,
            'tieneMultasPendientes' => $tieneMultasPendientes,
        ]);
    }

    /**
     * Procesar la refrenda de la licencia.
     */
    public function refrendar()
    {
        $usuario = auth()->user();

        // 1. Verificar que sea persona natural.
        if ($usuario->tipo_persona !== 'Natural') {
            return redirect()->route('licencias.index')->with([
                'estadoRefrenda' => 'Rechazada',
                'mensajeRefrenda' => 'La refrenda es exclusiva para personas naturales.',
            ]);
        }

        // 2. Buscar la licencia del titular.
        $licencia = Licencia::where(
            'documento_titular',
            $usuario->documento_identidad
        )->first();

        if (!$licencia) {
            return redirect()->route('licencias.index')->with([
                'estadoRefrenda' => 'Rechazada',
                'mensajeRefrenda' => 'No se encontró una licencia registrada para este DUI.',
            ]);
        }

        // 3. Obtener vehículos pertenecientes al titular.
        $placas = DB::table('vehiculos')
            ->where(
                'documento_propietario',
                $usuario->documento_identidad
            )
            ->pluck('placa');

        // 4. Verificar multas pendientes asociadas al DUI.
        $multasPorDocumento = DB::table('multas')
            ->where(
                'documento_infractor',
                $usuario->documento_identidad
            )
            ->where('estado_pago', 'Pendiente')
            ->exists();

        // 5. Verificar fotomultas pendientes asociadas a sus vehículos.
        $multasPorVehiculo = DB::table('multas')
            ->whereIn('placa_vehiculo', $placas)
            ->whereNull('documento_infractor')
            ->where('estado_pago', 'Pendiente')
            ->exists();

        // 6. Si existen multas pendientes, rechazar la refrenda.
        if ($multasPorDocumento || $multasPorVehiculo) {
            return redirect()->route('licencias.index')->with([
                'estadoRefrenda' => 'Rechazada',
                'mensajeRefrenda' => 'No se puede aprobar la refrenda porque existen multas pendientes de pago.',
            ]);
        }

        // 7. Aprobar la refrenda y actualizar la vigencia por cinco años.
        DB::transaction(function () use ($licencia) {
            $licencia->fecha_vencimiento = now()->addYears(5)->toDateString();
            $licencia->estado = 'Vigente';
            $licencia->save();
        });

        return redirect()->route('licencias.index')->with([
            'estadoRefrenda' => 'Aprobada',
            'mensajeRefrenda' => 'La refrenda fue aprobada. Su licencia tiene una nueva vigencia de cinco años.',
        ]);
    }
}
