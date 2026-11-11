<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Multa extends Model
{
    use HasFactory;

    protected $table = 'multas';
    protected $primaryKey = 'id_multa';

    protected $fillable = [
        'placa_vehiculo',
        'documento_infractor',
        'descripcion',
        'monto',
        'estado_pago',
        'fecha_infraccion',
    ];

    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class, 'placa_vehiculo', 'placa');
    }
}