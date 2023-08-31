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

class ExportAssemblerSiswa implements FromView
{
    use Exportable;
    
    public function view(): View
    {
        $title = "Hasil Ujian Test Masuk";
        $cek = $this->queryNilai();
        
        $colums = array("NO REGISTRASI", "NISN", "GELOMBANG", "NAMA LENGKAP", "NILAI AKADEMIK", "NILAI WAWANCARA & BTQ", "NILAI RAPOR", "TOTAL NILAI", "KETERANGAN");
        $listData = $cek;
        return view('exportNilai', compact('title', 'colums', 'listData'));
    }

    public function queryNilai()
    {
        return DB::table("users")
        ->select("users.name as namaLengkap",
                "users.id_registrasi as noRegistrasi",
                "users.nisn",
                "users.gelombang",
                "m_nilai.akademik as nilaiAkademik",
                "m_nilai.rapor as nilaiRapot",
                "m_nilai.lisan as nilaiWawancara",
                "m_nilai.hasil_perhitungan as nilaiHasil",
                "m_nilai.status_kelulusan")
        ->leftJoin('m_nilai', 'm_nilai.users', '=', 'users.id')
        ->where('users.is_verifikasi', '!=', 2)
        ->get();
    }
}
