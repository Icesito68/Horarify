<?php

namespace App\Http\Controllers\Api;

use App\Models\Horario;
use Orion\Http\Requests\Request as OrionRequest;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;
use App\Models\Supermercado;

class SupermercadoController extends Controller
{
    use DisableAuthorization;

    protected $model = Supermercado::class;
    
    public function empleados($id)
    {
        $supermercado = Supermercado::with('empleados')->findOrFail($id);
        return response()->json($supermercado->empleados);
    }

    public function horarios($id)
    {
        $supermercado = Supermercado::with('horarios')->findOrFail($id);
        return response()->json($supermercado->horarios);
    }

    public function festivos($id)
    {
        $supermercado = Supermercado::with('festivos')->findOrFail($id);
        return response()->json($supermercado->festivos);
    }

    public function ultimoHorario($id)
    {
        $horario = Horario::where('supermercado_id', $id)
            ->orderByDesc('inicio_semana')
            ->first();
    
        if (!$horario) {
            return response()->json(['message' => 'No se encontró ningún horario.'], 404);
        }
    
        return response()->json(['inicio_semana' => $horario->Inicio_Semana]);
    }

}