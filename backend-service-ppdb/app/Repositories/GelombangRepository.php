<?php

namespace App\Repositories;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use DB;
class GelombangRepository
{
    public function index()
    {
        return DB::table('gelombang')->orderBy("gelombang", "ASC")->get();
    }

    public function add($data)
    {
        return DB::table('gelombang')->insert($data);
    }

    public function delete($id)
    {
        return DB::table('gelombang')->where('id_gelombang', $id)->delete();
    }

    public function update($data,$id)
    {
        return DB::table('gelombang')->where('id_gelombang', $id)->update($data);
    }

    public function getJumlahByGelombang($tahun)
    {
        $query = DB::table('gelombang')
                ->select('gelombang.*', "gelombang.gelombang as gel", DB::raw("(select count(users.id) from users where users.gelombang_id = gelombang.id_gelombang) as jumlah"))
                ->orderBy("gelombang.tahun_ajaran", "desc")
                ->orderBy("gelombang.gelombang", "ASC");
        if($tahun != "") {
            $query = $query->where("tahun_ajaran", $tahun);
        }
        $query = $query->get()->map(function($data) {
            if ($data->gelombang) {
                $data->gelombang = "Gelombang ".$data->gelombang;
            }
              return $data;
          });
        
        return $query;
    }
}