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

    protected $model = Empleado::class;
}