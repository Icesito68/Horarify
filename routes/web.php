<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', [AuthenticatedSessionController::class, 'create'])
->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::get('/empleados', function () {
        return Inertia::render('empleados');
    });

    Route::get('/festivos', function () {
        return Inertia::render('festivos');
    });

    Route::get('/contacto', function () {
        return Inertia::render('contacto');
    });

    Route::fallback(function () {
        return Inertia::render('notFound');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::resource('empleados', App\Http\Controllers\Api\EmpleadoController::class)->only('store');
