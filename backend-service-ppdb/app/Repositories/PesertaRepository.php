<?php

namespace App\Repositories;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\TypeKelas;
use App\Models\DetailJenisPembayaran;
use DB;
class PesertaRepository
{
    public function index($status)
    {
        return DB::table('users')
                ->select("id",
                    "name",
                    "email",
                    "image",
                    "id_registrasi",
                    "nisn",
                    "photo",
                    "is_verifikasi",
                    "is_lulus",
                    "gelombang",
                    "gelombang_id"
                )->where('is_verifikasi', $status)->get();
    }

    public function cekEmail($email){
        return DB::table('users')->where('email', $email)->first();
    }

    public function verifikasi($data)
    {
        return DB::table('users')->whereIn('id', $data)->update(array('is_verifikasi' => 1));
    }
    
    public function detailPeserta($uuid, $id)
    {
        return DB::table('biodata')->where('userUuid', $uuid)->orWhere('users', $id)->first();
    }

    public function updatePeserta($uuid, $id, $data)
    {
        return DB::table('biodata')->where('userUuid', $uuid)->orWhere('users', $id)->update($data);
    }

    public function updateUser($uuid, $id, $data)
    {
        return DB::table('users')->where('userUuid', $uuid)->orWhere('id', $id)->update($data);
    }

    public function updateByUserId($id, $data)
    {
        return DB::table('users')->where('id', $id)->update($data);
    }

    public function tambahPeserta($data)
    {
        return DB::table('biodata')->insert($data);
    }

    public function detailPesertaByNoreg($regId)
    {
        return DB::table('users')->where('id_registrasi', $regId)->first();
    }

    public function listPeserta()
    {
        return DB::table('users')
                ->select(
                    "users.userUuid as usersUuid",
                    "users.id as userId",
                    "users.name",
                    "users.email",
                    "users.id_registrasi",
                    "users.nisn",
                    "users.photo",
                    "users.is_verifikasi",
                    "m_nilai.status_kelulusan",
                    "users.gelombang",
                    "users.gelombang_id",
                    "biodata.*",
                    "tr_biodata.biodata as statusBiodata",
                    "tr_biodata.datakeluarga as statusDataKeluarga",
                    "tr_biodata.alamat as statusAlamat",
                    "tr_biodata.berkas as statusBerkas"
                )
                ->leftJoin("biodata", "biodata.userUuid", "=", "users.userUuid")
                ->leftJoin("tr_biodata", "biodata.users", "=", "tr_biodata.users")
                ->leftJoin("m_nilai", "m_nilai.users", "=", "users.id")
                ->where('users.is_verifikasi', "!=", 2)->get();
    }

    public function getById($id)
    {
        return DB::table('tr_biodata')->where("users", $id)->first();
    }

    public function updateStatus($id, $data)
    {
        return DB::table('tr_biodata')->where('users', $id)->update($data);
    }

    public function insertStatus($data)
    {
        return DB::table('tr_biodata')->insert($data);
    }

    public function insertAll(array $data)
    {
        return DB::table('biodata')->insert($data);
    }

    public function insertAllUser(array $data)
    {
        return DB::table('users')->insert($data);
    }

    public function getSiswaLulus(){
        return DB::table('m_nilai')->where("status_kelulusan", "Lulus")->get();
    }

    public function checkToken($id)
    {
        return DB::table('users')->where('resetToken', $id)->first();
    }

    public function updateBio($id, $data)
    {
        return DB::table('users')->where('id', $id)->update($data);
    }

    public function cekEmailById($email, $id){
        return DB::table('users')->where('email', $email)->where("id", "!=", $id)->first();
    }

    public function cekById($id){
        return DB::table('users')->where("id", $id)->first();
    }

    public function getStatusBio($id)
    {
        return DB::table('tr_biodata')->where('users', $id)->first();
    }

    public function getKetNilaiById($id)
    {
        return DB::table('m_nilai')->where('users', $id)->first();
    }

}