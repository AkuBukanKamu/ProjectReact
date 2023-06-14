<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Spp;
use Auth;
use Date;
use Illuminate\Http\Request;

class SppController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        try {
            $currentMonth = date('n');
            $currentYear = date('Y');
            $isPayment = Spp::where("id_student", $request->id_student)->whereRaw('MONTH(created_at) = ? AND YEAR(created_at) = ?', [$currentMonth, $currentYear])
                ->count();
            $user = Auth::user();
            $teacher = Guru::where("id_user", $user->id)->first();
            if (!$isPayment) {
                $spp = new Spp();
                $spp->id_teacher = $teacher->id;
                $spp->unit = $request->unit;
                $spp->id_student = $request->id_student;
                $spp->nominal = $request->nominal;
                $spp->save();
            } else{
                $spp = Spp::where("id_student", $request->id_student)->whereRaw('MONTH(created_at) = ? AND YEAR(created_at) = ?', [$currentMonth, $currentYear])
                ->first();
                $spp->id_teacher = $teacher->id;
                $spp->unit = $request->unit;
                $spp->id_student = $request->id_student;
                $spp->nominal = $request->nominal;
                $spp->save();
            }

            return $this->sendResponse($spp, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
    }
    public function students(Request $request)
    {
        try {
            $currentMonth = date('n');
            $currentYear = date('Y');  
            $user = Auth::user();
            $teacher = Guru::where("id_user", $user->id)->first();
            $students = Spp::where("id_teacher", $teacher->id)->whereRaw('MONTH(spps.created_at) = ? AND YEAR(spps.created_at) = ?', [$currentMonth, $currentYear])
                ->join("murids", "spps.id_student", "=", "murids.id")->select("spps.*", "murids.nama as nama_siswa", "murids.no_hp as no_hp")->get();
          

            return $this->sendResponse($students, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
