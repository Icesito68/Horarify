<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;
use App\Models\Empleado;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;
use Orion\Concerns\DisablePagination;

class EmpleadoController extends Controller
{
    use DisableAuthorization, DisablePagination;

    public function destroyMany(Request $request)
    {
        $ids = $request->input('ids', []);
        
        if (!is_array($ids) || empty($ids)) {
            return response()->json(['message' => 'No se proporcionaron IDs válidos'], 422);
        }
    
        Empleado::whereIn('id', $ids)->delete();
    
        return response()->json(['message' => 'Empleados eliminados correctamente']);
    }


    protected $model = Empleado::class;
}