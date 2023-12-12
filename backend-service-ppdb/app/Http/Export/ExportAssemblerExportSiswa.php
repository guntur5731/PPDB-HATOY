<?php

namespace App\Http\Export;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\Exportable;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;

class ExportAssemblerExportSiswa implements FromView
{
    use Exportable;
    protected $requestData;

    public function view(): View
    {
        // dd(Carbon::createFromFormat('Y-m-d h:i:s', '2021-06-30'));
        // dd((session('startDate'))." 00:00:00");
        $title = "Export Peserta Didik Baru";
        $cek = $this->queryPeserta();

        $colums = array(
            "NO REGISTRASI",
            "GELOMBANG",
            "EMAIL",
            "NISN",
            "ASAL SEKOLAH",
            "NIK",
            "NAMA LENGKAP",
            "JENIS KELAMIN",
            "TEMPAT LAHIR ",
            "TANGGAL LAHIR",
            "ANAK KE",
            "NAMA AYAH",
            "NO HP AYAH",
            "NAMA IBU",
            "NO HP IBU",
            "NAMA WALI",
            "PEKERJAAN AYAH",
            "PEKERJAAN IBU",
            "PENDIDIKAN AYAH",
            "PENDIDIKAN IBU",
            "PENGHASILAN ORANGTUA",
            "ALAMAT",
            "RT",
            "RW",
            "DUSUN",
            "KELURAHAN/DESA",
            "KECAMATAN",
            "KOTA/KABUPATEN",
            "KODE POS"
        );
        $listData = $cek;
        return view('exportSiswa', compact('title', 'colums', 'listData'));
    }

    public function queryPeserta()
    {
        return DB::select("SELECT
        `users`.`id_registrasi` AS `noRegistrasi`,
        `users`.`nisn`,
        `users`.`gelombang`,
        `users`.`name` AS `namaLengkap`,
        `users`.`email`,
        `biodata`.* 
    FROM
        `users`
        LEFT JOIN `biodata` ON `biodata`.`userUuid` = `users`.`userUuid` 
    WHERE
        DATE_FORMAT(users.created_at, '%Y-%m-%d' ) BETWEEN '".session('startDate')."' AND '".session('endDate')."'
         ORDER BY id_registrasi ASC");
        // return DB::table("users")
        //     ->select(
        //         "users.id_registrasi as noRegistrasi",
        //         "users.nisn",
        //         "users.gelombang",
        //         "users.name as namaLengkap",
        //         "biodata.*"
        //     )
        //     ->leftJoin('biodata', 'biodata.userUuid', '=', 'users.userUuid')
        //     ->whereBetween("DATE_FORMAT(users.created_at, '%Y-%m-%d' )", [session('startDate'), session('endDate')])
        //     ->where('users.is_verifikasi', '!=', 2)
        //     ->get();
    }
}