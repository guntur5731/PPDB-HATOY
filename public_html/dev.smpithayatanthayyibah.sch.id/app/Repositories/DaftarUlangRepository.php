<?php

namespace App\Repositories;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\DaftarUlang;
class DaftarUlangRepository
{
    public function index($userid, $code)
    {
        return DaftarUlang::where("user_id", $userid)->where("code", $code)->where("status", 1)->count();
    }
    public function findById($userid, $code)
    {
        return DaftarUlang::select("tr_daftar_ulang.*", "m_params.keys")
                ->join("m_params", "m_params.id_params", "=", "tr_daftar_ulang.code")
                ->where("tr_daftar_ulang.user_id", $userid)->where("tr_daftar_ulang.code", $code)->where("tr_daftar_ulang.status", 1)->orderBy("tr_daftar_ulang.created_at", "ASC")->get();
    }
    public function add($data)
    {
        return DaftarUlang::insert($data);
    }

    public function delete($data, $id)
    {
        return DB::table('tr_daftar_ulang')->where('uuid', $id)->update($data);
    }
    public function verifikasiList($verify)
    {
        return DB::table('v_daftar_ulang')->where("daftar_ulang", $verify)->get();
    }
}