<?php

namespace App\Services;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Repositories\UserRepository;
use App\Repositories\BiayaRepository;
use App\Repositories\PesertaRepository;

class HomeServices
{
    protected $UserRepository;
    protected $BiayaRepository;
    protected $PesertaRepository;

    public function __construct(UserRepository $UserRepository, BiayaRepository $BiayaRepository, PesertaRepository $PesertaRepository)
    {
      $this->UserRepository = $UserRepository;
      $this->BiayaRepository = $BiayaRepository;
      $this->PesertaRepository = $PesertaRepository;
    }

    public function index()
    {
      $response = new Response;
      $data["totalPendaftar"] = count($this->PesertaRepository->listPeserta());
      $data["belumVerifikasi"] = count($this->PesertaRepository->index("0"));
      $data["sudahVerifikasi"] = count($this->PesertaRepository->index("1"));
      $data["siswaLulus"] = count($this->PesertaRepository->getSiswaLulus());
      $response->setData($data);
      $response->setCode(200);
      $response->setStatus(true);
      $response->setMessage("Sukses Mengambil Data");
      return $response->sendResponse();
    }

    public function biaya()
    {
      $response = new Response;
      $response->setData($this->BiayaRepository->index());
      $response->setCode(200);
      $response->setStatus(true);
      $response->setMessage("Sukses Mengambil Data");
      return $response->sendResponse();
    }

    public function biayaUpdate ($data) 
    {
      $response = new Response;
      $update["uang_pangkal"] = $data->uangPangkal;
      $update["dana_tahunan"] = $data->danaTahunan;
      $update["biaya_pendidikan"] = $data->biayaPendidikan;
      $update["biaya_seragam"] = $data->biayaSeragam;
      $update["biaya_pendaftaran"] = $data->biayaPendaftaran;
      $update["keterangan"] = $data->keterangan;
      $update["updated_at"] = date('Y-m-d H:i:s');

      $response->setData($this->BiayaRepository->biayaUpdate($update));
      $response->setData($data->all());
      $response->setCode(200);
      $response->setStatus(true);
      $response->setMessage("Sukses Update Data");
      return $response->sendResponse();
    }
}