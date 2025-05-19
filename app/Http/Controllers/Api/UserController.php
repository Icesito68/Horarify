<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    protected $model = User::class;

    /**
     * @OA\Get(
     *     path="/api/users/{userId}/supermercados",
     *     summary="Obtener supermercados del usuario",
     *     description="Devuelve la lista de supermercados asociados a un usuario.",
     *     tags={"Usuarios"},
     *     @OA\Parameter(
     *         name="userId",
     *         in="path",
     *         description="ID del usuario",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de supermercados",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="nombre", type="string", example="Supermercado El Ahorro"),
     *                 @OA\Property(property="direccion", type="string", example="Calle 123")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado"
     *     )
     * )
     */
    public function usuarioSupermercados($userId)
    {
        $user = User::with('supermercados')->findOrFail($userId);
        return response()->json($user->supermercados);
    }
}