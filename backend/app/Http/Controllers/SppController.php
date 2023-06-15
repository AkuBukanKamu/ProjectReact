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
        try {
            $data = Spp::where("nominal", "<>", "0")
            ->join("murids", "spps.id_student", "=", "murids.id")
            ->select("spps.*", "murids.nama as nama_siswa")
            ->orderBy('created_at', 'desc')->get();

            return $this->sendResponse($data, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
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
            $isPayment = Spp::where("id_student", $request->id_student)->whereRaw('MONTH(spps.created_at) = ? AND YEAR(spps.created_at) = ?', [$currentMonth, $currentYear])
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
            } else {
                $search = Spp::where("id_student", $request->id_student)->whereRaw('MONTH(spps.created_at) = ? AND YEAR(spps.created_at) = ?', [$currentMonth, $currentYear])
                    ->first();
                $spp = Spp::findOrFail($search->id);
                $spp->id_teacher = $teacher->id;
                $spp->unit = $request->unit;
                $spp->id_student = $request->id_student;
                $spp->nominal = $request->nominal;
                $spp->save();
            }

            return $this->sendResponse($isPayment, "data retrieved successfully");
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
                ->join("murids", "spps.id_student", "=", "murids.id")->select("spps.*", "murids.nama as nama_siswa", "murids.no_hp as no_hp", "murids.umur as umur")->get();


            return $this->sendResponse($students, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
    }
}
