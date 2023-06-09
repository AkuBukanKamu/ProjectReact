<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        return User::select('id','name','email','level')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     =>'required',
            'email'    =>'required',
            'password' =>'required',
            'level'    =>'required'
        ]);

        try{

            $user = User::create([
                'name'      => $request->name,
                'email'     => $request->email,
                'password'  => bcrypt($request->password),
                'level'     => $request->level,
            ]);

            return response()->json([
                'message'=>'User Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a user!!'
            ],500);
        }
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            'datauser'=>$user
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name'     =>'required',
            'email'    =>'required',
            'password' =>'required',
            'level'    =>'required'
        ]);

        $user = User::findOrFail($id);

        try{

            $user->update([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => bcrypt($request->password),
                'level'    => $request->level,
            ]);

            return response()->json([
                'message'=>'User Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a user!!'
            ],500);
        }
    }

    public function destroy($id)
    {
        try {

            // $user->delete();
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json([
                'message'=>'User Deleted Successfully!!'
            ]);

        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a user!!'
            ]);
        }
    }
}
