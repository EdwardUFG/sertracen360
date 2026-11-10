<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    use HasFactory;

    // 1. Configurar la llave primaria personalizada
    protected $primaryKey = 'placa';
    public $incrementing = false;
    protected $keyType = 'string';

    // 2. Campos de tu migración
    protected $fillable = [
        'placa', 
        'documento_propietario', 
        'id_marca', 
        'modelo',
        'anio',
        'tipo_vehiculo',
        'estado'
    ];

    // 3. Relación con multas (indicando las llaves foráneas correctas)
    public function multas()
    {
        return $this->hasMany(Multa::class, 'placa_vehiculo', 'placa');
    }
}