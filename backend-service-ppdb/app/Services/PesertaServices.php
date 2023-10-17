<?php

namespace App\Services;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;
use App\Repositories\PesertaRepository;
use App\Repositories\UserRepository;
use File;
use App\Http\Export\ExportAssemblerExportSiswa;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Export\UsersExport;
use Mail;
use App\Mail\DemoMail;
use Illuminate\Support\Facades\Hash;

class PesertaServices
{
    protected $PesertaRepository;
    protected $UserRepository;

    public function __construct(PesertaRepository $PesertaRepository, UserRepository $UserRepository)
    {
      $this->PesertaRepository = $PesertaRepository;
      $this->UserRepository = $UserRepository;
    }

    public function index()
    {
        $response = new Response;
        $response->setData($this->PesertaRepository->index(0));
        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Sukses Mengambil Data");
        return $response->sendResponse();
    }

    public function verifikasi($data)
    {
      $response = new Response;
      try {
        $allData = $data->all();
        $update = array();
        foreach ($allData as $key => $value) {
          $update[$key] = array(
            $value['id']
          );
        }

        $response->setData($this->PesertaRepository->verifikasi($update));

        $response->setData($update);
        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Sukses Update Data");
      } catch (\Exception $e) {
        $response->setCode(500);
        $response->setMessage($e->getMessage());
      }
      return $response->sendResponse();
    }

    public function detailPeserta($request)
    {
      $response = new Response;

      $id = Auth::user()->id;
      $uuid = Auth::user()->userUuid;
      if($request->id){
        $id = $request->id;
      }
      if($request->userUuid){
        $uuid = $request->userUuid;
      }
      $data = $this->PesertaRepository->detailPeserta($uuid, $id);
        $response->setData($data);
        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Sukses Mengambil Data");
        return $response->sendResponse();
    }

    public function decode($request, $format){
      if($format == ".pdf" || $format == ".pdf" || $format == ".pdf"){
        $image_parts = explode(";base64,", $request);
        $image_type_aux = explode("application/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        return $image_base64;
      }else{
        $image_parts = explode(";base64,", $request);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        return $image_base64;
      }
    }

    public function updatePeserta($request)
    {
      $response = new Response;
      try {
        $uuid = Auth::user()->userUuid;
        $userId = Auth::user()->id;

        $checkNik = $this->PesertaRepository->checkNik($request->nik, $request->userId);
        if($checkNik && $request->update == "biodata"){
          $response->setCode(200);
          $response->setStatus(false);
          $response->setMessage("Nik Sudah Terdaftar");
          return $response->sendResponse();
        }

        if($request->id){
          $userId = $request->id;
        }

        if($request->userUuid){
          $uuid = $request->userUuid;
        }

        $folderPath = "dokumen/";
        if(!File::isDirectory($folderPath)){
            File::makeDirectory($folderPath, 0777, true, true);
        }
        if($request->update == "biodata"){
          $peserta["nik"] = $request->nik;
          $peserta["anakke"] = $request->anakKe;
          $peserta["tempat_lahir"] = $request->tempatLahir;
          $peserta["tanggal_lahir"] = $request->tanggalLahir;
          $peserta["jenis_kelamin"] = $request->jenisKelamin;
          $peserta['asal_sekolah'] = $request->asalSekolah;
          $peserta['alamat_asal_sekolah'] = $request->alamatAsalSekolah;
          $peserta['npsn'] = $request->npsn;
          $peserta["users"] = $userId;
          $bio["biodata"] = 1;
        }else if($request->update == "datakeluarga"){
          $peserta["nama_ayah"] = $request->nama_ayah;
          $peserta["nama_ibu"] = $request->nama_ibu;
          $peserta["nama_wali"] = $request->nama_wali;
          $peserta["nama_rekening"] = $request->nama_rekening;
          $peserta["no_hp"] = $request->no_hp;
          $peserta["no_hp1"] = $request->no_hp1;
          $peserta["pekerjaan_ayah"] = $request->pekerjaan_ayah;
          $peserta["pekerjaan_ibu"] = $request->pekerjaan_ibu;
          $peserta["penghasilan_ortu"] = $request->penghasilan_ortu;
          $peserta["pendidikan_ayah"] = $request->pendidikan_ayah;
          $peserta["pendidikan_ibu"] = $request->pendidikan_ibu;
          $bio["datakeluarga"] = 1;
        }else if($request->update == "alamat"){
          $peserta["kwn"] = $request->kwn;
          $peserta["alamat"] = $request->alamat;
          $peserta["rt"] = $request->rt;
          $peserta["rw"] = $request->rw;
          $peserta["dusun"] = $request->dusun;
          $peserta["kelurahan"] = $request->kelurahan;
          $peserta["kecamatan"] = $request->kecamatan;
          $peserta["kota"] = $request->kota;
          $peserta["kode_pos"] = $request->kode_pos;
          $bio["alamat"] = 1;
        }else if($request->update == "berkas"){
          //akte
          if($request['akte'] && $request['akte'] != ""){
            $akteConvert = $this->decode($request['akte'], $request['formatakte']);
            $fileakte = $folderPath . uniqid() .$request['formatakte'];
            file_put_contents($fileakte, $akteConvert);
            $peserta["akte"] = $fileakte;
          }
          //kk
          if($request['kartu_kk'] && $request['kartu_kk'] != ""){
            $kkConvert = $this->decode($request['kartu_kk'], $request['formatkk']);
            $fileKK = $folderPath . uniqid() .$request['formatkk'];
            file_put_contents($fileKK, $kkConvert);
            $peserta["kartu_kk"] = $fileKK;
          }
          //pembayaran
          if($request['bk_pembayaran'] && $request['bk_pembayaran'] != ""){
            $pemConvert = $this->decode($request['bk_pembayaran'], $request['fotmatpembayaran']);
            $filepem = $folderPath . uniqid() .$request['fotmatpembayaran'];
            file_put_contents($filepem, $pemConvert);
            $peserta["bk_pembayaran"] = $filepem;
          }
          $bio["berkas"] = 1;
        }

        if($peserta){
          $check = $this->PesertaRepository->detailPeserta($uuid, $userId);
          if($check){
            $peserta['updated_at'] = date('Y-m-d H:i:s');
            $this->PesertaRepository->updatePeserta($uuid, $userId, $peserta);
          }else{
            $peserta['created_at'] = date('Y-m-d H:i:s');
            $this->PesertaRepository->tambahPeserta($peserta);
          }
        }

        if($bio){
          $ceks = $this->PesertaRepository->getById($userId);
          if($ceks){
            $bio['updated_at'] = date('Y-m-d H:i:s');
            $this->PesertaRepository->updateStatus($userId, $bio);
          }else{
            $bio["users"] = $userId;
            $bio['created_at'] = date('Y-m-d H:i:s');
            $this->PesertaRepository->insertStatus($bio);
          }
        }
        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Sukses Update Data");
      } catch (\Exception $e) {
        $response->setCode(500);
        $response->setMessage($e->getMessage());
      }
      return $response->sendResponse();
    }

    public function listPeserta()
    {
      $response = new Response;
      $response->setData($this->PesertaRepository->listPeserta());
      $response->setCode(200);
      $response->setStatus(true);
      $response->setMessage("Sukses mengambil data");
      return $response->sendResponse();
    }

    public function uploadPeserta($data)
    {
      $response = new Response;
      $data = $data->all();

      if(sizeof($data)){
        $insertUser= [];
        $insertBiodata= [];
        foreach ($data as $key => $value) {
          $cekPeserta = $this->UserRepository->getByIdRegistrasi($value["no_peserta_test"]);
          if($cekPeserta){
            $updateUser = array(
              "name" => $value["nama_siswa"],
              "email" => $value["email"],
              "role_id" => 0,
              "id_registrasi"=>$value["no_peserta_test"],
              "nisn" => $value["nisn"],
              "gelombang"=> $value["gelombang"],
            );
            $cekPesertaBio = $this->PesertaRepository->detailPeserta($cekPeserta->userUuid, $cekPeserta->id);
            if($cekPesertaBio){
              $updateBiodata = array(
                "no_hp" => $value["no._tlp/hp"],
                "no_hp1" => $value["no._tlp/hp"],
                "nik"=> $value["no_induk_kependudukan"],
                "anakke" => $value["anak_ke"],
                "alamat" => $value["alamat_lengkap"],
                "tempat_lahir" => $value["tempat_lahir"],
                "tanggal_lahir" => $value["tanggal_lahir"],
                "jenis_kelamin" => $value["l/p"] === "P" || $value["l/p"] === "p" ? "Perempuan" : "Laki-laki",
                "rt"=> $value["rt"],
                "rw"=> $value["rw"],
                "kelurahan" => $value["kelurahan/desa"],
                "kecamatan" => $value["kecamatan"],
                "kota" => $value["kota/kabupaten"],
                "kode_pos" => $value["kode_pos"],
                "asal_sekolah" => $value["asal_sekolah"],
                "nama_ayah" => $value["nama_ayah"],
                "nama_ibu" => $value["nama_ibu"],
                "nama_wali" => $value["nama_ayah"],
                "pekerjaan_ayah" => $value["pekerjaan_ayah"],
                "pekerjaan_ibu" => $value["pekerjaan_ibu"],
                "pendidikan_ayah" => $value["pendidikan_ayah"],
                "pendidikan_ibu"=>$value["pendidikan_ibu"]
              );
            }
            if($updateBiodata){
              $this->PesertaRepository->updatePeserta($cekPeserta->userUuid, $cekPeserta->id, $updateBiodata);
            }
            if($updateUser){
              $this->PesertaRepository->updateUser($cekPeserta->userUuid, $cekPeserta->id, $updateUser);
            }
          }else{
            $cekPeserta = $this->PesertaRepository->cekEmail($value["email"]);
            if($cekPeserta){
              $response->setData("Email ".$value["email"]." Sudah Terdaftar");
              $response->setStatus(false);
              $response->setCode(200);
              $response->setMessage("Email Sudah Terdaftar");
              return $response->sendResponse();
            }
            $userUuid = Uuid::uuid4()->getHex();
            $insertUser[] = array(
              "name" => $value["nama_siswa"],
              "email" => $value["email"],
              "role_id" => 0,
              "id_registrasi"=>$value["no_peserta_test"],
              "nisn" => $value["nisn"],
              "gelombang"=> $value["gelombang"],
              "userUuid"=> $userUuid,
              "password"=>bcrypt($value['no_peserta_test']),
              "is_verifikasi" => 0
            );
            $insertBiodata[] = array(
              "userUuid" => $userUuid,
              "no_hp" => $value["no._tlp/hp"],
              "no_hp1" => $value["no._tlp/hp"],
              "nik"=> $value["no_induk_kependudukan"],
              "anakke" => $value["anak_ke"],
              "alamat" => $value["alamat_lengkap"],
              "tempat_lahir" => $value["tempat_lahir"],
              "tanggal_lahir" => $value["tanggal_lahir"],
              "jenis_kelamin" => $value["l/p"] === "P" || $value["l/p"] === "p" ? "Perempuan" : "Laki-laki",
              "rt"=> $value["rt"],
              "rw"=> $value["rw"],
              "kelurahan" => $value["kelurahan/desa"],
              "kecamatan" => $value["kecamatan"],
              "kota" => $value["kota/kabupaten"],
              "kode_pos" => $value["kode_pos"],
              "asal_sekolah" => $value["asal_sekolah"],
              "nama_ayah" => $value["nama_ayah"],
              "nama_ibu" => $value["nama_ibu"],
              "nama_wali" => $value["nama_ayah"],
              "pekerjaan_ayah" => $value["pekerjaan_ayah"],
              "pekerjaan_ibu" => $value["pekerjaan_ibu"],
              "pendidikan_ayah" => $value["pendidikan_ayah"],
              "pendidikan_ibu"=>$value["pendidikan_ibu"]
            );
          }
        }
        if(sizeof($insertBiodata) > 0){
          $this->PesertaRepository->insertAll($insertBiodata);
        }
        if(sizeof($insertUser) > 0){
          $this->PesertaRepository->insertAllUser($insertUser);
        }
      }

      $response->setCode(200);
      $response->setStatus(true);
      $response->setMessage("Sukses menyimpan data");
      return $response->sendResponse();
    }

  public function downloadPeserta($request)
  {
      $title = "Export Peserta";
      session(['startDate' => $request->startDate]);
      session(['endDate' => $request->endDate]);
      if ($request->type === "hMOyFkfc8jKmu5aJkHmj/A==") {
        return Excel::download(new ExportAssemblerExportSiswa, 'peserta.xlsx');
      } else if ($request->type === "V7oI9liYiTE7PqQX7QAVug==") {
          return (new ExportAssemblerExportSiswa())->download('Export-Peserta.csv');
      } else if ($request->type === "Ja4dFgHCjcprTMG3ImSA==") {
          $colums = array("NO REGISTRASI", "NISN", "GELOMBANG", "NAMA LENGKAP", "NILAI AKADEMIK", "NILAI WAWANCARA & BTQ", "NILAI RAPOR", "TOTAL NILAI", "KETERANGAN");
          $listData = $this->NilaiRepository->queryExportNilai();
          $pdf = PDF::loadView('exportNilai', compact('title', 'colums', 'listData'));
          // return $pdf->download('pdf_file.pdf');
          return $pdf->stream();
      } else {
          return "null";
      }
  }

  public function lupaPassword($request)
  {
    $response = new Response;
    $data = $request->all();
    try {
      $cekPeserta = $this->PesertaRepository->cekEmail($data["email"]);
      if($cekPeserta){
        $date = date('Y-m-d');
        $addDay = strtotime($date."+ 2 days");
        $uuid = Uuid::uuid4()->getHex();
        $token = base64_encode($uuid.'&'.date("Y-m-d",$addDay));

        $update["resetToken"] = $token;
        $this->PesertaRepository->updateByUserId($cekPeserta->id, $update);
        $mailData = [
          'title' => 'SMP IT Hayatan Thayyibah',
          'url' => env('FRONTENDURL', 'https://peserta.smpithayatanthayyibah.sch.id')."/change-password?".$token,
          'namaUser' => $cekPeserta->name
        ];
        Mail::to($cekPeserta->email)->send(new DemoMail($mailData));
      }

      $response->setData($cekPeserta);
      $response->setCode(200);
      $response->setStatus(true);
      $response->setMessage("Sukses kirim email");
    } catch (\Exception $e) {
      $response->setCode(500);
      $response->setMessage($e->getMessage());
    }
    return $response->sendResponse();
  }

  public function checkToken($request)
  {
    $response = new Response;
    $response->setData(false);
    $data = $request->all();
    try {
      $cekToken = $this->PesertaRepository->checkToken($data["token"]);
      if($cekToken){
        $response->setData(true);
      }

      $response->setCode(200);
      $response->setStatus(true);
      $response->setMessage("Token");
    } catch (\Exception $e) {
      $response->setCode(500);
      $response->setMessage($e->getMessage());
    }
    return $response->sendResponse();
  }

  public function changePassword($request)
  {
    $response = new Response;
    $response->setData(false);
    $data = $request->all();
    try {
      $cekToken = $this->PesertaRepository->checkToken($data["token"]);
      if($cekToken){
        $update["password"] = bcrypt($data["newPassword"]);
        $update["resetToken"] = null;
        $this->PesertaRepository->updateByUserId($cekToken->id, $update);
      }
      $response->setData(null);
      $response->setCode(200);
      $response->setStatus(true);
      $response->setMessage("Token");
    } catch (\Exception $e) {
      $response->setCode(500);
      $response->setMessage($e->getMessage());
    }
    return $response->sendResponse();
  }

  public function updateBio($request){
    $response = new Response;
    $data = $request->all();
    try {
      $userId = Auth::user()->id;
      if($request->userId){
        $userId = $request->userId;
      }
      if($request["param"] == "profile"){
        $update["name"] = $data["nama"];
        $update["nisn"] = $data["nisn"];
        $update["email"] = $data["email"];

        $cekemail = $this->PesertaRepository->cekEmailById($data["email"], $userId);
        if($cekemail){
          $response->setData("Email Sudah Terdaftar");
          $response->setMessage("Email Sudah Terdaftar");
          $response->setStatus(false);
        }
        if($update && !$cekemail){
          $update['updated_at'] = date('Y-m-d H:i:s');
          $this->PesertaRepository->updateBio($userId, $update);
          $response->setData("");
          $response->setMessage("Berhasil Update biodata");
          $response->setStatus(true);
        }
      } else if($request["param"] == "resetpass"){
        $cekPeserta = $this->PesertaRepository->cekById($userId);
        if($cekPeserta){
            $update['updated_at'] = date('Y-m-d H:i:s');
            $update['password'] = bcrypt($cekPeserta->id_registrasi);
            $this->PesertaRepository->updateBio($userId, $update);
            $response->setData("");
            $response->setMessage("Berhasil Update biodata");
            $response->setStatus(true);
        }
      } else if($request["param"] == "editpass") {
        $cekPeserta = $this->PesertaRepository->cekById($userId);

        if(Hash::check($data["oldPassword"], $cekPeserta->password)){
          $update['updated_at'] = date('Y-m-d H:i:s');
          $update['password'] = bcrypt($data["newPassword"]);
          $this->PesertaRepository->updateBio($userId, $update);
          $response->setData("");
          $response->setMessage("Berhasil Update biodata");
          $response->setStatus(true);
        } else {
          $response->setData("");
          $response->setMessage("Kata sandi saat ini tidak sesuai");
          $response->setStatus(false);
        }
      }

      $response->setCode(200);
    } catch (\Exception $e) {
      $response->setCode(500);
      $response->setMessage($e->getMessage());
    }
    return $response->sendResponse();
  }

  public function getPeserta($request)
  {
    $response = new Response;
    try {
      $userId = Auth::user()->id;
      if($request->id){
        $userId = $request->id;
      }
      $cekToken = $this->PesertaRepository->cekById($userId);
      $response->setData($cekToken);
      $response->setCode(200);
      $response->setStatus(true);
      $response->setMessage("Sukses mengambil data");
    } catch (\Exception $e) {
      $response->setCode(500);
      $response->setMessage($e->getMessage());
    }
    return $response->sendResponse();
  }

  public function dashboard()
  {
    $response = new Response;
    try {
      $userId = Auth::user()->id;

      $biodata = $this->PesertaRepository->getStatusBio($userId);
      $peserta["biodata"] = $biodata;
      $peserta["kelulusan"] = $this->PesertaRepository->getKetNilaiById($userId);
      $user = $this->PesertaRepository->cekById($userId);
      $isVerifikasi = 0;
      if($user){
        $isVerifikasi = $user->is_verifikasi;
      }
      $peserta["verifikasi"] = $isVerifikasi;

      $response->setData($peserta);
      $response->setCode(200);
      $response->setStatus(true);
      $response->setMessage("Sukses mengambil data");
    } catch (\Exception $e) {
      $response->setCode(500);
      $response->setMessage($e->getMessage());
    }
    return $response->sendResponse();
  }
}