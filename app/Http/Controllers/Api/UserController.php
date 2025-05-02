<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;

class UserController extends Controller
{
    use DisableAuthorization;

    protected $model = User::class;

    public function usuarioSupermercados($userId)
    {
        // Obtiene al usuario con sus supermercados
        $user = User::with('supermercados')->findOrFail($userId);

        // Devuelve solo los supermercados
        return response()->json($user->supermercados);
    }
}