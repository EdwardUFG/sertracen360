<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tramite extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_tramite';

    protected $fillable = [
        'documento_solicitante',
        'placa_vehiculo',
        'documento_licencia',
        'tipo_tramite',
        'estado_tramite',
        'fecha_solicitud'
    ];
}