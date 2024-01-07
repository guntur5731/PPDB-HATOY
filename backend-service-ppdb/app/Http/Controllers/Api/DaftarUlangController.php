<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;
use App\Services\DaftarUlangServices;

class DaftarUlangController extends Controller
{
    protected $DaftarUlangServices;

    public function __construct(DaftarUlangServices $DaftarUlangServices)
    {
      $this->DaftarUlangServices = $DaftarUlangServices;
    }
    
    public function index() 
    {
        return $this->DaftarUlangServices->index();
    }

    public function upload(Request $request) 
    {
        return $this->DaftarUlangServices->upload($request);
    }
    public function delete($request) 
    {
        return $this->DaftarUlangServices->delete($request);
    }
    public function verifikasiList(Request $request) 
    {
        return $this->DaftarUlangServices->verifikasiList($request);
    }
    public function verifikasi(Request $request) 
    {
        return $this->DaftarUlangServices->verifikasi($request);
    }
}