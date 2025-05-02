<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Orion\Concerns\DisableAuthorization;

class UserController extends Controller
{
    use DisableAuthorization;

    protected $model = User::class;
}