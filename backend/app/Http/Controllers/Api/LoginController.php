<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function __invoke(Request $request)
    {
        $validator = validator::make($request->all(), [
            'email'     => 'required',
            'password'  => 'required'
        ]);

        //Jika Validasi gagal

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    //get credentials from request
    $credentials = $request->only('email', 'password');

    //jika auth gagal
    if(!$token = JWTAuth::attempt($credentials)) {
        return response()->json([
            'success'   => false,
            'message'   => 'Maaf Email atau Password salah'
        ], 401);
    }

    //jika auth sukses
    return response()->json([
        'success'       => true,
        'datauser'      => auth()->user(),
        'token'         => $token,
    ], 200);



    }
}
