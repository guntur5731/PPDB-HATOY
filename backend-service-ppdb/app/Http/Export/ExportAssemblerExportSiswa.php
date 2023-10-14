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

class ExportAssemblerExportSiswa implements FromView
{
    use Exportable;
    protected $requestData;

    public function view(): View
    {
        dd(session('reqData'));
        $title = "Export Peserta";
        $cek = $this->queryPeserta();

        $colums = array(
            "NO REGISTRASI",
            "GELOMBANG",
            "NISN",
            "ASAL SEKOLAH",
            "NIK",
            "NAMA LENGKAP",
            "JENIS KELAMIN",
            "TEMPAT, TANGGAL LAHIR",
            "NAMA AYAH",
            "NAMA IBU",
            "NAMA WALI",
            "PEKERJAAN AYAH",
            "PEKERJAAN IBU",
            "PENDIDIKAN AYAH",
            "PENDIDIKAN IBU",
            "PENGHASILAN ORANGTUA",
            "ALAMAT",
            "RT",
            "RW",
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
        return DB::table("users")
            ->select(
                "users.id_registrasi as noRegistrasi",
                "users.nisn",
                "users.gelombang",
                "users.name as namaLengkap",
                "biodata.*"
            )
            ->leftJoin('biodata', 'biodata.userUuid', '=', 'users.userUuid')
            ->where('users.is_verifikasi', '!=', 2)
            ->get();
    }
}