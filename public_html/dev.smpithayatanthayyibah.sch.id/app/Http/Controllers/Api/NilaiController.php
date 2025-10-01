<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Services\NilaiServices;
use App\Http\Controllers\Controller as Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Export\UsersExport;
class NilaiController extends Controller
{
    protected $NilaiServices;

    public function __construct(NilaiServices $NilaiServices)
    {
      $this->NilaiServices = $NilaiServices;
    }

    public function index()
    {
        return $this->NilaiServices->index();
    }

    public function inputNilai(Request $request)
    {
        return $this->NilaiServices->inputNilai($request);
    }

    public function uploadNilai(Request $request)
    {
        return $this->NilaiServices->uploadNilai($request);
    }

    public function downloadNilai(Request $request)
    {
        return $this->NilaiServices->downloadNilai($request);
    }
    
    public function export() 
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
