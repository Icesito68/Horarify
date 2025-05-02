<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Empleado extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'DNI',
        'Nombre',
        'Apellidos',
        'Telefono',
        'Turno',
        'Horas_Semanales',
        'Dia_Libre',
        'Rotativo',
        'Especial',
        'Email',
        'supermercado_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'Rotativo' => 'boolean',
            'Especial' => 'boolean',
            'supermercado_id' => 'integer',
        ];
    }

    public function supermercado(): BelongsTo
    {
        return $this->belongsTo(Supermercado::class);
    }

    public function horarios(): HasMany
    {
        return $this->hasMany(Horario::class);
    }

    public function vacaciones(): HasOne
    {
        return $this->hasOne(Vacaciones::class);
    }
}
