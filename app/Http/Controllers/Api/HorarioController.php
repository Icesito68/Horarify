<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;
use App\Models\Horario;
use Orion\Http\Requests\Request as OrionRequest;
use Orion\Concerns\DisableAuthorization;
use Orion\Concerns\DisablePagination;

class HorarioController extends Controller
{
    use DisableAuthorization, DisablePagination;

    protected $model = Horario::class;
}