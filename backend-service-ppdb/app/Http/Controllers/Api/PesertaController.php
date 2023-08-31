<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Services\PesertaServices;
use App\Http\Controllers\Controller as Controller;

class PesertaController extends Controller
{
    protected $PesertaServices;

    public function __construct(PesertaServices $PesertaServices)
    {
      $this->PesertaServices = $PesertaServices;
    }

    public function index()
    {
        return $this->PesertaServices->index();
    }

    public function verifikasi(Request $request)
    {
        return $this->PesertaServices->verifikasi($request);
    }

    public function detailPeserta(Request $request)
    {
        return $this->PesertaServices->detailPeserta($request);
    }

    public function updatePeserta(Request $request)
    {
        return $this->PesertaServices->updatePeserta($request);
    }

    public function listPeserta()
    {
        return $this->PesertaServices->listPeserta();
    }

    public function uploadPeserta(Request $request)
    {
        return $this->PesertaServices->uploadPeserta($request);
    }

    public function downloadPeserta(Request $request)
    {
        return $this->PesertaServices->downloadPeserta($request);
    }

    public function lupaPassword(Request $request)
    {
        return $this->PesertaServices->lupaPassword($request);
    }

    public function checkToken(Request $request)
    {
        return $this->PesertaServices->checkToken($request);
    }

    public function changePassword(Request $request)
    {
        return $this->PesertaServices->changePassword($request);
    }

    public function updateBio(Request $request)
    {
        return $this->PesertaServices->updateBio($request);
    }
    public function getPeserta(Request $request)
    {
        return $this->PesertaServices->getPeserta($request);
    }

    public function dashboard() 
    {
        return $this->PesertaServices->dashboard();
    }
    
}
