<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;
use App\Models\Horario;
use Orion\Http\Requests\Request as OrionRequest;
use Orion\Concerns\DisableAuthorization;

class HorarioController extends Controller
{
    use DisableAuthorization;

    protected $model = Horario::class;
}