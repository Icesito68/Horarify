<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Requests\Request as OrionRequest;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller;
use App\Models\Supermercado;

class SupermercadoController extends Controller
{
    use DisableAuthorization;

    protected $model = Supermercado::class;

}