<?php

namespace App\Services;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Repositories\UploadRepository;
use Ramsey\Uuid\Uuid;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Import\SiswaImport;
use \stdClass;
use App\Http\Import\VotersImport;

class UploadServices
{
    public function upload($request)
    {
        $response = new Response;

        $file = $request->file('file');

        $dataExcel = Excel::toArray([], $request->file);
        $dataSiswa= [];
        if(sizeof($dataExcel) > 0){
            for ($ii=0; $ii < sizeof($dataExcel) ; $ii++) { 
                foreach ($dataExcel[$ii] as $key => $value) {
                    $object = new stdClass();
                    for ($i=0; $i < sizeof($value) ; $i++) {
                        $name = (String) $dataExcel[$ii][0][$i];
                        $name = strtolower(str_replace(' ', '_', $name));
                        $object->$name = $value[$i];
                    }
                    $dataSiswa[] = $object;
                }
            }
        }
        $response->setData($dataSiswa);
        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Upload Data");
        return $response->sendResponse();
    }
}