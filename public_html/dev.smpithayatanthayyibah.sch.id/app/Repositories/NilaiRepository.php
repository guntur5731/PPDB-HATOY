<?php

namespace App\Repositories;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use DB;
class NilaiRepository
{
    public function index()
    {
        return DB::table('users')
            ->select('users.name', 'users.nisn', 'users.id_registrasi',
            'm_nilai.rapor', 'm_nilai.lisan', 'm_nilai.akademik', 'm_nilai.hasil_perhitungan', "m_nilai.status_kelulusan", "m_nilai.files")
            ->leftjoin('m_nilai', 'm_nilai.users', '=', 'users.id')
            ->where('users.is_verifikasi', '!=', 2)
            ->orderBy('users.id_registrasi', 'ASC')
        ->get()->map(function($data) {
            if (!$data->rapor) {
                $data->rapor = '-';
            } 
            if (!$data->lisan) {
                $data->lisan = '-';
            } 
            if (!$data->akademik) {
                $data->akademik = '-';
            } 
            if (!$data->hasil_perhitungan) {
                $data->hasil_perhitungan = '-';
            } 
            if (!$data->status_kelulusan) {
                $data->status_kelulusan = '-';
            }
              return $data;
          });
    }

    public function getByUsers($id)
    {
        return DB::table('m_nilai')->where('users', $id)->first();
    }

    public function create($data)
    {
        return DB::table('m_nilai')->insert($data);
    }

    public function update($data, $id)
    {
        return DB::table('m_nilai')->where('users', $id)->update($data);
    }

    public function getNilai()
    {
        return DB::table('m_params')->where('keys', 'kelulusan')->first();
    }

    public function insertAll(array $data)
    {
        return DB::table('m_nilai')->insert($data);
    }

    public function queryExportNilai()
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