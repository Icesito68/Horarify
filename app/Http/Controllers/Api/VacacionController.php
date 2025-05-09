<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;
use App\Models\Vacaciones;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;

class VacacionController extends Controller
{
    use DisableAuthorization;

    protected $model = Vacaciones::class;

        public function destroyMany(Request $request)
    {
        $ids = $request->input('ids', []);
        
        if (!is_array($ids) || empty($ids)) {
            return response()->json(['message' => 'No se proporcionaron IDs válidos'], 422);
        }
    
        Vacaciones::whereIn('id', $ids)->delete();
    
        return response()->json(['message' => 'Vacaciones eliminadas correctamente']);
    }

}