<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    protected $model = User::class;
    public function usuarioSupermercados($userId)
    {
        $user = User::with('supermercados')->findOrFail($userId);
        return response()->json($user->supermercados);
    }
}