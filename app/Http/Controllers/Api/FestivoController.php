<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;
use App\Models\Festivo;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;
use Orion\Concerns\DisablePagination;

class FestivoController extends Controller
{
    use DisableAuthorization, DisablePagination;

    public function destroyMany(Request $request)
    {
        $ids = $request->input('ids');
        
        if (!is_array($ids) || empty($ids)) {
            return response()->json(['message' => 'No se enviaron IDs válidos'], 400);
        }
    
        Festivo::whereIn('id', $ids)->delete();
    
        return response()->json(['message' => 'Festivos eliminados correctamente']);
    }

    protected $model = Festivo::class;
}