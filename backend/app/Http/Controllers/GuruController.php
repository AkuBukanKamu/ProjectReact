<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\User;
use Illuminate\Http\Request;

class GuruController extends BaseController
{
    public function index()
    {
        return Guru::all();
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

            return response()->json([
                'message' => 'Deleted Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                $e
            ]);
        }
    }
}
