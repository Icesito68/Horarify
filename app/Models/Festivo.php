<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Festivo extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'Fecha',
        'Nombre',
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
            'Fecha' => 'date',
            'supermercado_id' => 'integer',
        ];
    }

    public function supermercado(): BelongsTo
    {
        return $this->belongsTo(Supermercado::class);
    }
}
