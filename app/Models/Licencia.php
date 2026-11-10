<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Licencia extends Model
{
    protected $table = 'licencias';

    protected $primaryKey = 'documento_titular';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'documento_titular',
        'tipo_licencia',
        'fecha_emision',
        'fecha_vencimiento',
        'estado',
    ];

    protected function casts(): array
    {
        return [
            'fecha_emision' => 'date',
            'fecha_vencimiento' => 'date',
        ];
    }

    public function titular(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'documento_titular',
            'documento_identidad'
        );
    }
}