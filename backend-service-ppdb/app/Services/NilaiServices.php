<?php

namespace App\Services;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;
use App\Repositories\NilaiRepository;
use App\Repositories\PesertaRepository;
use App\Repositories\UserRepository;
use File;
use App\Http\Export\ExportAssemblerSiswa;
use PDF;

class NilaiServices
{
    protected $NilaiRepository;
    protected $PesertaRepository;
    protected $UserRepository;

    public function __construct(NilaiRepository $NilaiRepository, PesertaRepository $PesertaRepository, UserRepository $UserRepository)
    {
      $this->NilaiRepository = $NilaiRepository;
      $this->PesertaRepository = $PesertaRepository;
      $this->UserRepository = $UserRepository;
    }

    public function index()
    {
        $response = new Response;
        $response->setData($this->NilaiRepository->index());
        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Sukses Mengambil Data");
        return $response->sendResponse();
    }

    public function inputNilai($request)
    {
        $response = new Response;
        $data = $request->all();

        $checkPeserta = $this->PesertaRepository->detailPesertaByNoreg($data['noRegis']);
        if($checkPeserta){
            $checkInNilai = $this->NilaiRepository->getByUsers($checkPeserta->id);
            $getParamNilai = $this->NilaiRepository->getNilai();

            $minimumNilai = 60;
            if($getParamNilai){
                $minimumNilai = $getParamNilai->value;
            }

            $hasilPerhitungan = ((int) $data['nilaiAkademik'] + (int) $data['nilaiRapot'] + (int) $data['nilaiWawancara']) / 3;

            $insert['akademik'] = $data['nilaiAkademik'];
            $insert['rapor'] = $data['nilaiRapot'];
            $insert['lisan'] = $data['nilaiWawancara'];
            $insert['hasil_perhitungan'] = $hasilPerhitungan;
            $insert['status_kelulusan'] = $hasilPerhitungan >= $minimumNilai ? "Lulus" : "Tidak Lulus";
            $insert['created_at'] = date('Y-m-d H:i:s');

            $insert['files'] = $data['urlsSurat'];
            if($checkInNilai){
                $this->NilaiRepository->update($insert, $checkPeserta->id);
            }else{
                $insert['users'] = $checkPeserta->id;
                $this->NilaiRepository->create($insert);
            }

            $response->setData($hasilPerhitungan >= $minimumNilai ? "Lulus" : "Tidak Lulus");
        }

        $response->setCode(200);
        $response->setStatus(true);
        $response->setMessage("Sukses Mengambil Data");
        return $response->sendResponse();
    }

    public function uploadNilai($request)
    {
        $response = new Response;

        $data = $request->all();
        try {

            if(sizeof($data)){
                $insert = [];
                foreach ($data as $key => $value) {
                    $cekPeserta = $this->UserRepository->getByIdRegistrasi($value["no_peserta_test"]);
                    if($cekPeserta){
                        $checkInNilai = $this->NilaiRepository->getByUsers($cekPeserta->id);
                        $rapor = is_numeric($value["nilai_rapor"]) ? $value["nilai_rapor"] : 0;
                        $lisan = is_numeric($value["nilai_wawancara_&_btq"]) ? $value["nilai_wawancara_&_btq"] : 0;
                        $akademik = is_numeric($value["nilai_akademik"]) ? $value["nilai_akademik"] : 0;
                        $hasil = ($rapor + $lisan + $akademik) / 3;

                        $getParamNilai = $this->NilaiRepository->getNilai();
                        $minimumNilai = 60;
                        if($getParamNilai){
                            $minimumNilai = $getParamNilai->value;
                        }
                        if($checkInNilai){
                            $update= array("akademik" => $akademik,
                                            "rapor" => $rapor,
                                            "lisan" => $lisan,
                                            "hasil_perhitungan" => $hasil,
                                            "status_kelulusan" => $hasil >= $minimumNilai ? "Lulus" : "Tidak Lulus",
                                            "updated_at" => date('Y-m-d H:i:s'));
                            $this->NilaiRepository->update($update, $cekPeserta->id);
                        }else{
                            $insert[] = array("akademik" => $akademik,
                                            "rapor" => $rapor,
                                            "lisan" => $lisan,
                                            "hasil_perhitungan" => $hasil,
                                            "status_kelulusan" => $hasil >= $minimumNilai ? "Lulus" : "Tidak Lulus",
                                            "users" => $cekPeserta->id,
                                            "created_at" => date('Y-m-d H:i:s'));
                        }
                    }
                }
                if(sizeof($insert)){
                    $this->NilaiRepository->create($insert);
                }
            }
            $response->setData($insert);
            $response->setCode(200);
            $response->setStatus(true);
            $response->setMessage("Sukses Mengambil Data");
        } catch (\Exception $e) {
            $response->setCode(500);
            $response->setMessage($e->getMessage());
        }
        return $response->sendResponse();
    }

    public function downloadNilai($request)
    {
        $title = "Hasil Ujian Test Masuk";
        if ($request->type === "hMOyFkfc8jKmu5aJkHmj/A==") {
            return (new ExportAssemblerSiswa())->download('Export-Nilai-Siswa.xlsx');
        } else if ($request->type === "V7oI9liYiTE7PqQX7QAVug==") {
            return (new ExportAssemblerSiswa())->download('Export-Nilai-Siswa.csv');
        } else if ($request->type === "Ja4dFgHCjcprTMG3ImSA==") {
            $colums = array("NO REGISTRASI", "NISN", "GELOMBANG", "NAMA LENGKAP", "NILAI AKADEMIK", "NILAI WAWANCARA & BTQ", "NILAI RAPOR", "TOTAL NILAI", "KETERANGAN");
            $listData = $this->NilaiRepository->queryExportNilai();
            $pdf = PDF::loadView('exportNilai', compact('title', 'colums', 'listData'));
            // return $pdf->download('pdf_file.pdf');
            return $pdf->stream();
        } else {
            return "null";
        }
    }
}