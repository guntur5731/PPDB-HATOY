<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;
use App\Services\UploadServices;

class UploadController extends Controller
{
    protected $UploadServices;

    public function __construct(UploadServices $UploadServices)
    {
      $this->UploadServices = $UploadServices;
    }

    public function upload (Request $request) 
    {
        return $this->UploadServices->upload($request);
    }
}