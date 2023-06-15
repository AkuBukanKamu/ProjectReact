<?php

namespace App\Http\Controllers;

use App\Models\Murid;
use Illuminate\Http\Request;

class MuridController extends BaseController
{
    public function index()
    {
        return Murid::join("gurus", "murids.id_guru", '=', 'gurus.id')->select("murids.*", "gurus.nama as nama_guru")->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'unit'          => 'required',
            'nama'          => 'required',
            'id_guru'      => 'required',
            'umur'          => 'required',
            'tempat_lahir'   => 'required',
            'tanggal_lahir'  => 'required',
            'no_hp'         => 'required',
            'alamat'        => 'required',
            'spp'           => 'required',
            'tanggal_masuk'  => 'required'
        ]);


        try {
            $student = new Murid;
            $student->id_guru = $request->id_guru;
            $student->unit          = $request->unit;
            $student->nama          = $request->nama;
            $student->tempat_lahir   = $request->tempat_lahir;
            $student->tanggal_lahir  = $request->tanggal_lahir;
            $student->umur  = $request->umur;
            $student->alamat  = $request->alamat;
            $student->no_hp         = $request->no_hp;
            $student->spp          = $request->spp;
            $student->tanggal_masuk  = $request->tanggal_masuk;
            $student->save();

            return response()->json([
                'data' => $student
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => $e
            ], 500);
        }
    }

    public function show($id)
    {
        $murid = Murid::findOrFail($id);

        return response()->json([
            'murid' => $murid
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'unit'          => 'required',
            'nama'          => 'required',
            'id_guru'      => 'required',
            'umur'          => 'required',
            'tempat_lahir'   => 'required',
            'tanggal_lahir'  => 'required',
            'no_hp'         => 'required',
            'alamat'        => 'required',
            'spp'           => 'required',
            'tanggal_masuk'  => 'required'
        ]);



        try {
            $student = Murid::findOrFail($id);
            $student->id_guru = $request->id_guru;
            $student->unit          = $request->unit;
            $student->nama          = $request->nama;
            $student->tempat_lahir   = $request->tempat_lahir;
            $student->tanggal_lahir  = $request->tanggal_lahir;
            $student->umur  = $request->umur;
            $student->alamat  = $request->alamat;
            $student->no_hp         = $request->no_hp;
            $student->spp          = $request->spp;
            $student->tanggal_masuk  = $request->tanggal_masuk;
            $student->save();


            return response()->json([
                'message' => 'Murid Updated Successfully!!'
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

            $student = Murid::findOrFail($id);
            $student->delete();

            return $this->sendResponse($student, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
    }
}
