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
        'tipo_vehiculo',
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
}