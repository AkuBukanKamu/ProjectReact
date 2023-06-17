<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Spp;
use Auth;
use Carbon\Carbon;
use Date;
use DB;
use Illuminate\Http\Request;

class SppController extends BaseController
{

    public function index(Request $request)
    {
        try {
            $monthYear = $request->get('month');
            if ($monthYear) {
                $cleanMonthYear = str_replace('"', '', $monthYear);
                $startDate = Carbon::createFromFormat('F Y', $cleanMonthYear)->startOfMonth();
                $endDate = Carbon::createFromFormat('F Y', $cleanMonthYear)->endOfMonth();
                $data = Spp::whereBetween('spps.created_at', [$startDate, $endDate])
                    ->where("nominal", "<>", "0")
                    ->join("murids", "spps.id_student", "=", "murids.id")
                    ->select("spps.*", "murids.nama as nama_siswa")
                    ->orderBy('created_at', 'desc')->get();
            } else {
                $data = Spp::where("nominal", "<>", "0")
                    ->join("murids", "spps.id_student", "=", "murids.id")
                    ->select("spps.*", "murids.nama as nama_siswa")
                    ->orderBy('created_at', 'desc')->get();
            }


            return $this->sendResponse($data, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
    }

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

    public function month(Request $request)
    {
        try {
            $months = Spp::select(DB::raw("DISTINCT DATE_FORMAT(created_at, '%M %Y') as month_year"))
                ->orderByRaw("DATE_FORMAT(created_at, '%Y-%m') DESC")
                ->get();

            return $this->sendResponse($months, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
    }
}
