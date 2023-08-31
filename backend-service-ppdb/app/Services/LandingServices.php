<?php

namespace App\Services;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Repositories\BiayaRepository;
use App\Repositories\ImageRepository;
use App\Repositories\GelombangRepository;
use Ramsey\Uuid\Uuid;
use DB;

class LandingServices
{
    protected $BiayaRepository;
    protected $ImageRepository;
    protected $GelombangRepository;

    public function __construct(BiayaRepository $BiayaRepository, ImageRepository $ImageRepository, GelombangRepository $GelombangRepository)
    {
      $this->BiayaRepository = $BiayaRepository;
      $this->ImageRepository = $ImageRepository;
      $this->GelombangRepository = $GelombangRepository;
    }

    public function index()
    {
      $response = new Response;
      $res['biaya'] = $this->BiayaRepository->index();
      $res['slide'] = $this->ImageRepository->slide("landing");
      $res['eskul'] = $this->ImageRepository->eskul();
      $res['gelombang'] = $this->GelombangRepository->index();
      $response->setData($res);
      $response->setCode(200);
      $response->setStatus(true);
      $response->setMessage("Sukses Mengambil Data");
      return $response->sendResponse();
    }

    public function imageLanding ($request)
    {
      $response = new Response;
      try {
        DB::beginTransaction();

        $folderPath = "landing/";
        $image_parts = explode(";base64,", $request->image);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        $file = $folderPath . uniqid() .$request->imageType;
        file_put_contents($file, $image_base64);

        $insert = array();
        $insert = array(
            "uuid" => Uuid::uuid4()->getHex(),
            "name"=> $request->name,
            "image" => $file,
            "type" => $request->type && $request->type === "slide" ? 1 : 2,
            "status" => 1,
            'created_at'=>date('Y-m-d H:i:s'),
            "created_by"=>Auth::user()->userId
        );

        $this->ImageRepository->add($insert);

        $response->setCode(200);
        $response->setStatus(true);
        $response->setData($insert);
        $response->setMessage("Simpan Data image");
        DB::commit();
      } catch (\Exception $e) {
          DB::rollBack();
          $response->setCode(500);
          $response->setMessage($e->getMessage());
      }
      return $response->sendResponse();
    }

    public function imageLandingList ($request)
    {
      $response = new Response;
      try {
        $data = array();
        if($request->type == 1){
          $data = $this->ImageRepository->slide("");
        }else if($request->type == 2){
          $data = $this->ImageRepository->eskul();
        }
        $response->setCode(200);
        $response->setStatus(true);
        $response->setData($data);
        $response->setMessage("Get Data image");
      } catch (\Exception $e) {
          DB::rollBack();
          $response->setCode(500);
          $response->setMessage($e->getMessage());
      }
      return $response->sendResponse();
    }

    public function imageLandingDelete ($request)
    {
      $response = new Response;
      try {

        $update = array();
        $update = array(
            "status" => 2,
            'updated_at'=>date('Y-m-d H:i:s'),
            "updated_by"=>Auth::user()->userId
        );

        $this->ImageRepository->update($update, $request->uuid);

        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Delete Data image");
      } catch (\Exception $e) {
          DB::rollBack();
          $response->setCode(500);
          $response->setMessage($e->getMessage());
      }
      return $response->sendResponse();
    }

    public function imageLandingUpdate ($request)
    {
      $response = new Response;
      try {
        DB::beginTransaction();

        $update = array();
        if($request->isUpload == "true"){

          $folderPath = "landing/";
          $image_parts = explode(";base64,", $request->image);
          $image_type_aux = explode("image/", $image_parts[0]);
          $image_type = $image_type_aux[1];
          $image_base64 = base64_decode($image_parts[1]);
          $file = $folderPath . uniqid() .$request->imageType;
          file_put_contents($file, $image_base64);

          $update = array(
              "name"=> $request->name,
              "image" => $file,
              'updated_at'=>date('Y-m-d H:i:s'),
              "updated_by"=>Auth::user()->userId
          );
        }else{
          $update = array(
            "name"=> $request->name,
            'updated_at'=>date('Y-m-d H:i:s'),
            "updated_by"=>Auth::user()->userId
        );
        }

        $this->ImageRepository->update($update, $request->uuid);

        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Simpan Data image");
        DB::commit();
      } catch (\Exception $e) {
          DB::rollBack();
          $response->setCode(500);
          $response->setMessage($e->getMessage());
      }
      return $response->sendResponse();
    }
}