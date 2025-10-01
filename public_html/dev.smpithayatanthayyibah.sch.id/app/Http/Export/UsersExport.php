<?php

namespace App\Http\Export;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use DB;
class UsersExport implements FromCollection, WithHeadings
{
    /**

    * @return \Illuminate\Support\Collection

    */

    public function collection()
    {
        return DB::table("users")
        ->select("users.id_registrasi as noRegistrasi",
                    "users.gelombang",
                    "users.nisn",
                    "biodata.asal_sekolah",
                    "biodata.nik",
                    "users.name as namaLengkap",
                    "biodata.jenis_kelamin",
                    "biodata.tempat_lahir",
                    "biodata.tanggal_lahir",
                    "biodata.nama_ayah",
                    "biodata.nama_ibu",
                    "biodata.nama_wali",
                    "biodata.pekerjaan_ayah",
                    "biodata.pekerjaan_ibu",
                    "biodata.pendidikan_ayah",
                    "biodata.pendidikan_ibu",
                    "biodata.penghasilan_ortu",
                    "biodata.alamat",
                    "biodata.rt",
                    "biodata.rw",
                    "biodata.kelurahan",
                    "biodata.kecamatan",
                    "biodata.kota",
                    "biodata.kelurahan",
                    "biodata.kode_pos")
        ->leftJoin('biodata', 'biodata.userUuid', '=', 'users.userUuid')
        ->where('users.is_verifikasi', '!=', 2)
        ->get();
    }

    public function headings(): array
    {
        return ["NO REGISTRASI", 
        "GELOMBANG", 
        "NISN",
        "ASAL SEKOLAH",
        "NIK",
        "NAMA LENGKAP",
        "JENIS KELAMIN",
        "TEMPAT AHIR",
        "TANGGAL LAHIR",
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
        ];
    }

}