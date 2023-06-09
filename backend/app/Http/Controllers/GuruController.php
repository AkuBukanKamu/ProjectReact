<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    public function index()
    {
        return Guru::select('id','unit','nama','tempatlahir','tanggallahir', 'no_hp', 'gaji','tanggalmasuk')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'unit'          =>'required',
            'nama'          =>'required',
            'tempatlahir'   =>'required',
            'tanggallahir'  =>'required',
            'no_hp'         =>'required',
            'gaji'          =>'required',
            'tanggalmasuk'  =>'required'
        ]);


        try{
            $guru = Guru::create([
                'unit'          => $request->unit,
                'nama'          => $request->nama,
                'tempatlahir'   => $request->tempatlahir,
                'tanggallahir'  => $request->tanggallahir,
                'no_hp'         => $request->no_hp,
                'gaji'          => $request->gaji,
                'tanggalmasuk'  => $request->tanggalmasuk
            ]);

            return response()->json([
                'message'=>'Guru Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong!!'
            ],500);
        }
        }

    public function show(Guru $id)
    {
        $guru = Guru::findOrFail($id);

        return response()->json([
            'guru'=>$guru
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'unit'          =>'required',
            'nama'          =>'required',
            'tempatlahir'   =>'required',
            'tanggallahir'  =>'required',
            'no_hp'         =>'required',
            'gaji'          =>'required',
            'tanggalmasuk'  =>'required'
        ]);

        $guru = Guru::findOrFail($id);

        try{

            $guru->update([
                'unit'          => $request->unit,
                'nama'          => $request->nama,
                'tempatlahir'   => $request->tempatlahir,
                'tanggallahir'  => $request->tanggallahir,
                'no_hp'         => $request->no_hp,
                'gaji'          => $request->gaji,
                'tanggalmasuk'  => $request->tanggalmasuk
            ]);

            return response()->json([
                'message'=>'Guru Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong!!'
            ],500);
        }
    }

    public function destroy($id)
    {
        try {

            $guru = Guru::findOrFail($id);
            $guru->delete();

            return response()->json([
                'message'=>'Deleted Successfully!!'
            ]);

        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong!!'
            ]);
        }
    }




    }

