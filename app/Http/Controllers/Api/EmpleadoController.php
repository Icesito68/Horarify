<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;
use App\Models\Empleado;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;

class EmpleadoController extends Controller
{
    use DisableAuthorization;

    protected $model = Empleado::class;
}