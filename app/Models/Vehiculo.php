<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    use HasFactory;

    protected $table = 'vehiculos';
    protected $primaryKey = 'placa';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'placa',
        'documento_propietario',
        'id_marca',
        'modelo',
        'anio',
        'color',
        'clase',
        'tipo_vehiculo',
        'capacidad',
        'dominio',
        'en_calidad',
        'numero_chasis',
        'numero_motor',
        'vin',
        'fecha_emision',
        'fecha_vencimiento',
        'estado',
    ];

    public function multas()
    {
        return $this->hasMany(Multa::class, 'placa_vehiculo', 'placa');
    }

    public function propietario()
    {
        return $this->belongsTo(User::class, 'documento_propietario', 'documento_identidad');
    }

    public function marca()
    {
        return $this->belongsTo(Marca::class, 'id_marca', 'id_marca');
    }
}