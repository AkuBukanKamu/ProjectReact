<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::select('id', 'name', 'email', 'level')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required',
            'email'    => 'required',
            'password' => 'required',
            'level'    => 'required',
        ]);

        try {

            $user = User::create([
                'name'      => $request->name,
                'email'     => $request->email,
                'password'  => bcrypt($request->password),
                'level'     => $request->level,
            ]);
            
            if ($request->level === "user") {
                $guru = new Guru;
                $guru->id_user = $user->id;
                $guru->unit          = $request->unit;
                $guru->nama          = $request->name;
                $guru->tempat_lahir   = $request->tempat_lahir;
                $guru->tanggal_lahir  = $request->tanggal_lahir;
                $guru->no_hp         = $request->no_hp;
                $guru->gaji          = $request->gaji;
                $guru->tanggal_masuk  = $request->tanggal_masuk;
                $guru->save();
            }


            return response()->json([
                'message' => 'User Created Successfully!!', 'data' => $user, 'isSuccess' => true
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                $e
            ], 500);
        }
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            'datauser' => $user
        ]);
    }
    public function detail()
    {
        $user = Auth::user();

        return response()->json([
            'result' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name'     => 'required',
            'email'    => 'required',
            'password' => 'required',
            'level'    => 'required'
        ]);

        $user = User::findOrFail($id);

        try {

            $user->update([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => bcrypt($request->password),
                'level'    => $request->level,
            ]);

            return response()->json([
                'message' => 'User Updated Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => $e
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {

            // $user->delete();
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json([
                'message' => 'User Deleted Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a user!!'
            ]);
        }
    }
}
