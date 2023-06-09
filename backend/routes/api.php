<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuruController;
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

Route::middleware('auth:api')->get('/users', function (Request $request) {
    return $request->user();
});

// Data User
Route::get('/users', [UserController::class, 'index']);
Route::post('/users/store', [UserController::class, 'store']);
Route::get('/users/show/{id}', [UserController::class, 'show']);
Route::patch('/users/update/{id}', [UserController::class, 'update']);
Route::delete('/users/destroy/{id}', [UserController::class, 'destroy']);

// Data Guru
Route::get('/guru', [GuruController::class, 'index']);
Route::post('/guru/store', [GuruController::class, 'store']);
Route::get('/guru/show/{id}', [GuruController::class, 'show']);
Route::patch('/guru/update/{id}', [GuruController::class, 'update']);
Route::delete('/guru/destroy/{id}', [GuruController::class, 'destroy']);

// Data Murid
Route::get('/murid', [MuridController::class, 'index']);
Route::post('/murid/store', [MuridController::class, 'store']);
Route::get('/murid/show/{id}', [MuridController::class, 'show']);
Route::patch('/murid/update/{id}', [MuridController::class, 'update']);
Route::delete('/murid/destroy/{id}', [MuridController::class, 'destroy']);
