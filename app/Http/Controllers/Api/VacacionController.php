<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;
use App\Models\Vacaciones;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;

class VacacionController extends Controller
{
    use DisableAuthorization;

    protected $model = Vacaciones::class;
}