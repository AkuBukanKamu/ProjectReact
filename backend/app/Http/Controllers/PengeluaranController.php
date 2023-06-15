<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Pengeluaran;
use Auth;
use Illuminate\Http\Request;

class PengeluaranController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $user = Auth::user();

            if ($user->level == "admin") {
                $data = Pengeluaran::orderBy('created_at', 'desc')->get();
            } else {
                $teacher = Guru::where("id_user", $user->id)->first();
                $data = Pengeluaran::where("Kategori", "<>", "Gaji")->where("unit", $teacher->unit)->orderBy('created_at', 'desc')->get();
            }
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {

            $expense = new Pengeluaran();
            $expense->unit = $request->unit;
            $expense->kategori = $request->kategori;
            $expense->keterangan = $request->keterangan;
            $expense->nominal = $request->nominal;
            $expense->save();

            return $this->sendResponse($expense, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
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
        try {
            $expense = Pengeluaran::findOrFail($id);
            $expense->unit = $request->unit;
            $expense->kategori = $request->kategori;
            $expense->keterangan = $request->keterangan;
            $expense->nominal = $request->nominal;
            $expense->save();

            return $this->sendResponse($expense, "data retrieved successfully");
        } catch (\Throwable $th) {
            return $this->sendError("error retrieving data", $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {

            $expense = Pengeluaran::findOrFail($id);
            $expense->delete();

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
