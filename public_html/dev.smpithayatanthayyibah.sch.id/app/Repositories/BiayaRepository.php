<?php

namespace App\Repositories;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use DB;
class BiayaRepository
{
    public function index()
    {
        return DB::table('biaya')
                ->select("keterangan", "biaya_pendaftaran", "biaya_seragam", "biaya_pendidikan", "dana_tahunan", "uang_pangkal")->first();
    }

    public function biayaUpdate ($data) 
    {
        return DB::table('biaya')->where('id_bayar', 1)->update($data);
    }
}