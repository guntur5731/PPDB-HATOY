<?php

namespace App\Services;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Repositories\TypeKelasRepository;
use Ramsey\Uuid\Uuid;

class TypeKelasServices
{
    protected $TypeKelasRepository;

    public function __construct(TypeKelasRepository $TypeKelasRepository)
    {
      $this->TypeKelasRepository = $TypeKelasRepository;
    }

    public function index()
    {
        $response = new Response;

        $response->setData($this->TypeKelasRepository->index());
        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Sukses Mengambil Data");
        return $response->sendResponse();
    }

    public function add($request)
    {
        $response = new Response;
        try {

            $insert = array(
                'nama'=> $request->namaKelas,
                'status'=> $request->status === "true" || $request->status === true || $request->status === 1 || $request->status === "1" ? 1 : 0,
                'created_at'=>date('Y-m-d H:i:s'),
                'created_by'=>Auth::user()->id
            );

            $this->TypeKelasRepository->save($insert);

            $response->setCode(200);
            $response->setStatus(true);
            $response->setMessage("Sukses Tambah Data");
        } catch (\Exception $e) {
            $response->setCode(500);
            $response->setMessage($e->getMessage());
        }
        return $response->sendResponse();
    }

    public function update($request)
    {
        $response = new Response;
        try {

            $update = array(
                'nama'=> $request->namaKelas,
                'status'=> $request->status === "true" || $request->status === true || $request->status === 1 || $request->status === "1" ? 1 : 0,
                'updated_at'=>date('Y-m-d H:i:s'),
                'updated_by'=>Auth::user()->id
            );

            $this->TypeKelasRepository->update($request->idTypeKelas, $update);
            
            $response->setCode(200);
            $response->setStatus(true);
            $response->setMessage("Sukses Update Data");
        } catch (\Exception $e) {
            $response->setCode(500);
            $response->setMessage($e->getMessage());
        }
        return $response->sendResponse();
    }
}