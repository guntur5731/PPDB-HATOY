<?php

namespace App\Services;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;
use Illuminate\Http\Request;
use App\Repositories\GelombangRepository;
use DB;
use PDF;

class DownloadServices
{
    public function index(Request $request)
    {
        try {
            $data = $request->data;
            $biodata = DB::table('users')
                ->select(
                    'users.email',
                    'users.name',
                    'users.id_registrasi',
                    'users.nisn',
                    DB::raw("DATE_FORMAT(users.created_at, '%d %M %Y') as tanggal_daftar"),
                    'biodata.tempat_lahir',
                    'tempat_lahir',
                    'tanggal_lahir',
                    'biodata.jenis_kelamin',
                    'biodata.nik',
                    'biodata.asal_sekolah',
                    'biodata.alamat',
                    'biodata.rt',
                    'biodata.rw',
                    'biodata.kelurahan',
                    'biodata.kecamatan'
                    ,
                    'biodata.kota',
                    'biodata.kode_pos',
                    'biodata.dusun',
                    'biodata.pilihan_i',
                    'biodata.pilihan_ii',
                    'biodata.alamat_asal_sekolah',
                    'biodata.agama',
                    'biodata.kebutuhan_khusus',
                    DB::raw("DATE_FORMAT(now(), '%d %M %Y') as tanggal_ttd"),
                    DB::raw("DATE_FORMAT(now(), '%H:%i') as jam")
                )->join('biodata', 'biodata.users', '=', 'users.id')
                ->where('users.useruuid', $data)->first();
            $biaya = DB::table('biaya')->select('biaya_pendaftaran')->where('id_bayar', 1)->first();
            $pdf = PDF::loadView('peserta.exportbiodata', compact("biodata", "biaya"));
            return $pdf->download('export.pdf');
        } catch (\Exception $e) {
            return null;
        }
        // dd($biodata);
        // return view('peserta.exportbiodata', compact("biodata", "biaya"));
    }
}