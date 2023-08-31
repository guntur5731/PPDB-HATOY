<?php

namespace App\Services;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;
use App\Repositories\GelombangRepository;

class GelombangServices
{
    protected $GelombangRepository;

    public function __construct(GelombangRepository $GelombangRepository)
    {
      $this->GelombangRepository = $GelombangRepository;
    }

    public function index()
    {
      $response = new Response;
      $response->setData($this->GelombangRepository->index());
      $response->setCode(200);
      $response->setStatus(true);
      $response->setMessage("Sukses Mengambil Data");
      return $response->sendResponse();
    }

    public function add($data)
    {
      try {
        $response = new Response;

        $insert['gelombang'] = $data->gelombang;
        $insert['tanggal_mulai'] = $data->tanggalMulai;
        $insert['tanggal_selesai'] = $data->tanggalSelesai;
        $insert['tahun_ajaran'] = $data->tahunAjaran;
        $insert['created_at'] = date('Y-m-d H:i:s');

        $this->GelombangRepository->add($insert);

        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Sukses menambah data");
      } catch (\Exception $e) {
        $response->setCode(500);
        $response->setMessage($e->getMessage());
      }
      return $response->sendResponse();
    }

    public function delete($data)
    {
      try {
        $response = new Response;
        $this->GelombangRepository->delete($data->id);
        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Sukses menghapus data");
      } catch (\Exception $e) {
        $response->setCode(500);
        $response->setMessage($e->getMessage());
      }
      return $response->sendResponse();
    }

    public function update($data)
    {
      try {
        $response = new Response;
        if($data->status == "open"){
          $update['posting'] = $data->aktif == 1 || $data->aktif == "1" ? null : 1;
          $update['updated_at'] = date('Y-m-d H:i:s');
          $this->GelombangRepository->update($update, $data->id);
          $response->setMessage("Sukses mengaktifkan gelombang");
        } else if($data->status == "update"){
          $update['gelombang'] = $data->gelombang;
          $update['tanggal_mulai'] = $data->tanggalMulai;
          $update['tanggal_selesai'] = $data->tanggalSelesai;
          $update['tahun_ajaran'] = $data->tahunAjaran;
          $update['updated_at'] = date('Y-m-d H:i:s');
          $this->GelombangRepository->update($update, $data->idGlombang);
        }

        // $this->GelombangRepository->bukaGlombang($insert);
        $response->setData($data->all());
        $response->setCode(200);
        $response->setStatus(true);
      } catch (\Exception $e) {
        $response->setCode(500);
        $response->setMessage($e->getMessage());
      }
      return $response->sendResponse();
    }

    public function listByGelombang($data)
    {
      $response = new Response;
      try {
        $response->setMessage("Sukses get data");
        $response->setData($this->GelombangRepository->getJumlahByGelombang(""));
        $response->setCode(200);
        $response->setStatus(true);
      } catch (\Exception $e) {
        $response->setCode(500);
        $response->setMessage($e->getMessage());
      }
      return $response->sendResponse();
    }
}