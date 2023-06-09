<?php

namespace App\Http\Controllers;

use App\Models\Murid;
use Illuminate\Http\Request;

class MuridController extends Controller
{
    public function index()
    {
        return Murid::select('id','unit','nama','namaguru', 'umur', 'nohp', 'alamat', 'spp', 'tanggalmasuk')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'unit'          =>'required',
            'nama'          =>'required',
            'namaguru'      =>'required',
            'umur'          =>'required',
            'nohp'         =>'required',
            'alamat'        =>'required',
            'spp'           =>'required',
            'tanggalmasuk'  =>'required'
        ]);


        try{
            $murid = Murid::create([
                'unit'          => $request->unit,
                'nama'          => $request->nama,
                'namaguru'      => $request->namaguru,
                'umur'          => $request->umur,
                'nohp'          => $request->nohp,
                'alamat'        => $request->alamat,
                'spp'           => $request->spp,
                'tanggalmasuk'  => $request->tanggalmasuk
            ]);

            return response()->json([
                'message'=>'Murid Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong!!'
            ],500);
        }
        }

    public function show(Murid $id)
    {
        $murid = Murid::findOrFail($id);

        return response()->json([
            'murid'=>$murid
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'unit'          =>'required',
            'nama'          =>'required',
            'namaguru'      =>'required',
            'umur'          =>'required',
            'nohp'          =>'required',
            'alamat'        =>'required',
            'spp'           =>'required',
            'tanggalmasuk'  =>'required'
        ]);

        $murid = Murid::findOrFail($id);

        try{

            $murid->update([
                'unit'          => $request->unit,
                'nama'          => $request->nama,
                'namaguru'      => $request->namaguru,
                'umur'          => $request->umur,
                'nohp'          => $request->nohp,
                'alamat'        => $request->alamat,
                'spp'           => $request->spp,
                'tanggalmasuk'  => $request->tanggalmasuk
            ]);

            return response()->json([
                'message'=>'Murid Updated Successfully!!'
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

            $murid = Murid::findOrFail($id);
            $murid->delete();

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

