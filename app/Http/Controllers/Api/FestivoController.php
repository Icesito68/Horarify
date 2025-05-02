<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;
use App\Models\Festivo;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;

class FestivoController extends Controller
{
    use DisableAuthorization;

    protected $model = Festivo::class;
}