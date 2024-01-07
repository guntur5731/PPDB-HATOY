<?php

namespace App\Services;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Repositories\DaftarUlangRepository;
use App\Repositories\ParamRepository;
use App\Repositories\PesertaRepository;
use Ramsey\Uuid\Uuid;
use File;
use DB;

class DaftarUlangServices
{
    protected $DaftarUlangRepository;
    protected $ParamRepository;
    protected $PesertaRepository;

    public function __construct(DaftarUlangRepository $DaftarUlangRepository, ParamRepository $ParamRepository, PesertaRepository $PesertaRepository)
    {
        $this->DaftarUlangRepository = $DaftarUlangRepository;
        $this->PesertaRepository = $PesertaRepository;
        $this->ParamRepository = $ParamRepository;
    }

    public function masterlocation()
    {
        $folderPath = "daftarulang";
        if (!File::isDirectory($folderPath)) {
            File::makeDirectory($folderPath, 0777, true, true);
        }
        return null;
    }

    public function index()
    {
        $response = new Response;
        $userId = Auth::user()->id;

        $param = $this->ParamRepository->index("bukti_transfer");
        $paramlampiran1 = $this->ParamRepository->index("lampiran_1");
        $paramlampiran2 = $this->ParamRepository->index("lampiran_2");
        $countBerkas = $this->DaftarUlangRepository->index($userId, $param->id_params);
        $countBerkasLampiran1 = $this->DaftarUlangRepository->index($userId, $paramlampiran1->id_params);
        $countBerkasLampiran2 = $this->DaftarUlangRepository->index($userId, $paramlampiran2->id_params);

        $data["buktiTransfer"] = false;
        $data["lampiran1"] = false;
        $data["lampiran2"] = false;
        $data["dataPembayaran"] = $this->DaftarUlangRepository->findById($userId, $param->id_params);
        $data["dataLampiran1"] = $this->DaftarUlangRepository->findById($userId, $paramlampiran1->id_params);
        $data["dataLampiran2"] = $this->DaftarUlangRepository->findById($userId, $paramlampiran2->id_params);
        if ($countBerkas < (int) $param->value && (Auth::user()->is_verifikasi == 1 || Auth::user()->is_verifikasi == "1")) {
            $data["buktiTransfer"] = true;
        }
        if ($countBerkasLampiran1 < (int) $paramlampiran1->value && (Auth::user()->is_verifikasi == 1 || Auth::user()->is_verifikasi == "1")) {
            $data["lampiran1"] = true;
        }
        if ($countBerkasLampiran2 < (int) $paramlampiran2->value && (Auth::user()->is_verifikasi == 1 || Auth::user()->is_verifikasi == "1")) {
            $data["lampiran2"] = true;
        }
        $response->setData($data);
        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Daftar Ulang");
        return $response->sendResponse();
    }

    public function upload($request)
    {
        try {
            DB::beginTransaction();
            $response = new Response;
            $userId = Auth::user()->id;
            $name = strtoupper(str_replace(" ", "_", Auth::user()->id_registrasi));
            $this->masterlocation();
            $folderPath = "daftarulang/" . $name . "/";

            if (!File::isDirectory($folderPath)) {
                File::makeDirectory($folderPath, 0777, true, true);
            }

            $pemConvert = $this->decode($request['files'], $request['format']);
            $filepem = $folderPath . uniqid() . $request['format'];
            file_put_contents($filepem, $pemConvert);

            $param = $this->ParamRepository->index($request->type);

            $insert["bukti_transfer"] = $filepem;
            $insert["user_id"] = $userId;
            $insert["status"] = 1;
            $insert["created_at"] =  date('Y-m-d H:i:s');
            $insert["created_by"] = $userId;
            $insert["code"] = $param->id_params;
            $insert["format"] = $request['format'];
            $insert["uuid"] = Uuid::uuid4()->getHex();
            $this->DaftarUlangRepository->add($insert);

            $response->setData(null);
            $response->setCode(200);
            $response->setStatus(true);
            $response->setMessage("Daftar Ulang Upload");
            DB::commit();
        }catch (\Exception $e) {
            DB::rollBack();
            $response->setCode(500);
            $response->setMessage($e->getMessage());
          }
        return $response->sendResponse();
    }
    public function delete($request)
    {
        try {
            DB::beginTransaction();
            $response = new Response;
            $userId = Auth::user()->id;
            
            $update["status"] = 2;
            $update["updated_at"] = date('Y-m-d H:i:s');
            $update["updated_by"] = $userId;

            $this->DaftarUlangRepository->delete($update, $request);

            $response->setData(null);
            $response->setCode(200);
            $response->setStatus(true);
            $response->setMessage("Delete Berkas Success");
            DB::commit();
        }catch (\Exception $e) {
            DB::rollBack();
            $response->setCode(500);
            $response->setMessage($e->getMessage());
          }
        return $response->sendResponse();
    }

    public function verifikasiList($request)
    {
        $response = new Response;
        $verify = 0;
        if($request->verify == "true"){
            $verify = 1;
        }

        $response->setData($this->DaftarUlangRepository->verifikasiList($verify));
        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Daftar Ulang Verifikasi");
        return $response->sendResponse();
    }

    public function decode($request, $format)
    {
        if ($format == ".pdf" || $format == ".pdf" || $format == ".pdf") {
            $image_parts = explode(";base64,", $request);
            $image_type_aux = explode("application/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            return $image_base64;
        } else {
            $image_parts = explode(";base64,", $request);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            return $image_base64;
        }
    }

    public function verifikasi($request)
    {
        try {
            DB::beginTransaction();
            $response = new Response;
            $userId = Auth::user()->id;
            $update["daftar_ulang"] = 1;
            $update["verify_at"] = date('Y-m-d H:i:s');
            $update["verify_by"] = $userId;
            $this->PesertaRepository->verifyDaftarUlang($request->dataList, $update);

            $response->setData(null);
            $response->setCode(200);
            $response->setStatus(true);
            $response->setMessage("Delete Berkas Success");
            DB::commit();
        }catch (\Exception $e) {
            DB::rollBack();
            $response->setCode(500);
            $response->setMessage($e->getMessage());
          }
        return $response->sendResponse();
    }
}