<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Murid;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class GuruController extends BaseController
{
    public function index()
    {
        return Guru::all();
    }

    public function dashboard()
    {
        try {
            $user = Auth::user();
            $teacher = Guru::where("id_user", $user->id)->first();
            $user->info = $teacher;
            $student = Murid::where("id_guru", $teacher->id)->get();
            $user->students = $student;
            return $this->sendResponse($user, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
    }

    public function teachersByUnit($name)
    {
        try {
            $teacher = Guru::where("unit", $name)->get();
            return $this->sendResponse($teacher, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $teacher = Guru::findOrFail($id);
            return $this->sendResponse($teacher, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
    }

    public function profileTeacher()
    {
        try {
            $user = Auth::user();
            $teacher = Guru::where("id_user", $user->id)->first();
            return $this->sendResponse($teacher, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'unit'          => 'required',
            'nama'          => 'required',
            'tempat_lahir'   => 'required',
            'tanggal_lahir'  => 'required',
            'no_hp'         => 'required',
            'gaji'          => 'required',
            'tanggal_masuk'  => 'required'
        ]);

        $guru = Guru::findOrFail($id);

        try {

            $guru->update([
                'unit'          => $request->unit,
                'nama'          => $request->nama,
                'tempat_lahir'   => $request->tempat_lahir,
                'tanggal_lahir'  => $request->tanggal_lahir,
                'no_hp'         => $request->no_hp,
                'gaji'          => $request->gaji,
                'tanggal_masuk'  => $request->tanggal_masuk
            ]);

            return response()->json([
                'message' => 'Guru Updated Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong!!'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $guru = Guru::findOrFail($id);
            $user = User::findOrFail($guru->id_user);
            $guru->delete();
            $user->delete();

            return $this->sendResponse($guru, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
    }
}
