<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\DownloadServices;

class DownloadController extends Controller
{
    protected $DownloadServices;

    public function __construct(DownloadServices $DownloadServices)
    {
      $this->DownloadServices = $DownloadServices;
    }
    public function index (Request $request) 
    {
        return $this->DownloadServices->index($request);
    }
}
