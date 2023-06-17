<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\MuridController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\SppController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', App\Http\Controllers\Api\LoginController::class)->name('login');
Route::post('/logout', App\Http\Controllers\Api\LogoutController::class)->name('logout');

// Route::middleware('auth:api')->get('/users', function (Request $request) {
//     return $request->user();
// });


Route::middleware(['auth:api','userAccess:admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::post('/user', [UserController::class, 'store']);
    Route::put('/user/{id}', [UserController::class, 'update']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);

    Route::get('/teachers', [GuruController::class, 'index']);
    Route::get('/teachers/unit/{name}', [GuruController::class, 'teachersByUnit']);
    Route::get('/teacher/{id}', [GuruController::class, 'show']);
    Route::put('/teacher/{id}', [GuruController::class, 'update']);
    Route::delete('/teacher/{id}', [GuruController::class, 'destroy']);

    Route::get('/students', [MuridController::class, 'index']);
    Route::get('/student/{id}', [MuridController::class, 'show']);
    Route::post('/student', [MuridController::class, 'store']);
    Route::put('/student/{id}', [MuridController::class, 'update']);
    Route::delete('/student/{id}', [MuridController::class, 'destroy']);

    Route::get('/income', [SppController::class, 'index']);
    Route::get('/monthOptions', [SppController::class, 'month']);
});

Route::middleware(['auth:api','userAccess:user'])->group(function () {
    Route::get('/dashboard', [GuruController::class, 'dashboard']);
    Route::get('/students/month', [SppController::class, 'students']);
    Route::post('/payment', [SppController::class, 'create']);
    Route::get('/profile/teacher', [GuruController::class, 'profileTeacher']);
    Route::get('/profile/student/{id}', [MuridController::class, 'show']);
});

Route::middleware(['auth:api'])->group(function () {
    Route::get('/chart', [UserController::class, 'chart']);
    Route::get('/user', [UserController::class, 'detail']);
    Route::get('/expense', [PengeluaranController::class, 'index']);
    Route::post('/expense', [PengeluaranController::class, 'store']);
    Route::put('/expense/{id}', [PengeluaranController::class, 'update']);
    Route::delete('/expense/{id}', [PengeluaranController::class, 'destroy']);
});