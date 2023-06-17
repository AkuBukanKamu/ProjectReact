<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Murid;
use App\Models\Pengeluaran;
use App\Models\Spp;
use App\Models\User;
use Auth;
use DB;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    public function index()
    {
        return User::select('id', 'name', 'email', 'level')->get();
    }

    public function chart()
    {
        try {
            $teachers = [
                'Kenongo' => Guru::where("unit", "Kenongo")->count(),
                'Magersari' => Guru::where("unit", "Magersari")->count(),
                'Surodinawan' => Guru::where("unit", "Surodinawan")->count(),
            ];
            $student = [
                'Kenongo' => Murid::where("unit", "Kenongo")->count(),
                'Magersari' => Murid::where("unit", "Magersari")->count(),
                'Surodinawan' => Murid::where("unit", "Surodinawan")->count(),
            ];
            $user = Auth::user();
            if ($user->level === "admin") {
                $income = Spp::select(DB::raw("DATE_FORMAT(created_at, '%M %Y') AS month"), DB::raw('SUM(nominal) AS nominal'))
                    ->groupBy(DB::raw('DATE_FORMAT(created_at, "%M %Y")'))
                    ->orderBy('created_at', 'asc')
                    ->get();

                $expense = Pengeluaran::select(DB::raw("DATE_FORMAT(created_at, '%M %Y') AS month"), DB::raw('SUM(nominal) AS nominal'))
                    ->groupBy(DB::raw('DATE_FORMAT(created_at, "%M %Y")'))
                    ->orderBy('created_at', 'asc')
                    ->get();
            } else {
                $teacher = Guru::where("id_user", $user->id)->first();
                $income = Spp::where("unit", $teacher->unit)->select(DB::raw('MONTHNAME(created_at) as month'), DB::raw('SUM(nominal) as nominal'))
                    ->groupBy(DB::raw('MONTHNAME(created_at)'), DB::raw('YEAR(created_at)'))
                    ->orderBy('created_at', 'asc')
                    ->get();

                $expense = Pengeluaran::where("unit", $teacher->unit)->select(DB::raw('MONTHNAME(created_at) as month'), DB::raw('SUM(nominal) as nominal'))
                    ->groupBy(DB::raw('MONTHNAME(created_at)'), DB::raw('YEAR(created_at)'))
                    ->orderBy('created_at', 'asc')
                    ->get();
            }


            $data = [
                'teacher' => $teachers,
                'student' => $student,
                'income' => $income,
                'expense' => $expense
            ];
            // $teacher = Guru::where("id_user", $user->id)->first();
            // $user->info = $teacher;
            // $student = Murid::where("id_guru", $teacher->id)->get();
            // $user->students = $student;
            return $this->sendResponse($data, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
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
            $teacher = Guru::where("id_user", $user->id)->first();
            $teacher->delete();
            $user->delete();

            return $this->sendResponse($user, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
    }
}
