<?php

use App\Http\Controllers\Api\EmpleadoController;
use App\Http\Controllers\Api\FestivoController;
use App\Http\Controllers\Api\HorarioController;
use App\Http\Controllers\Api\SupermercadoController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VacacionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['as' => 'api.'], routes: function() {
    Orion::resource("supermercados", SupermercadoController::class);
    Orion::resource("horarios", HorarioController::class);
    Orion::resource("empleados", EmpleadoController::class);
    Orion::resource("festivos", FestivoController::class);
    Orion::resource("vacaciones", VacacionController::class);
})->middleware('auth:sanctum');

Route::get('user/{userId}/supermercados', [UserController::class, 'usuarioSupermercados']);
Route::get('empleado/{userId}/vacaciones', [EmpleadoController::class, 'vacacionesEmpleado']);

Route::get('supermercados/{id}/empleados', action: [SupermercadoController::class, 'empleados']);
Route::get('supermercados/{id}/horarios', action: [SupermercadoController::class, 'horarios']);
Route::get('supermercados/{id}/ultimoHorario', [SupermercadoController::class, 'ultimoHorario']);
Route::get('supermercados/{id}/festivos', action: [SupermercadoController::class, 'festivos']);

Route::delete('empleados', [EmpleadoController::class, 'destroyMany']);
Route::delete('festivos', [FestivoController::class, 'destroyMany']);
Route::delete('vacaciones', [VacacionController::class, 'destroyMany']);