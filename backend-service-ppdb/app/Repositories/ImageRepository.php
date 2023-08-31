<?php

namespace App\Repositories;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use DB;
class ImageRepository
{
    public function slide($status)
    {
        $query = DB::table('m_image')
                ->where("type", 1)
                ->where("status", 1);
            if($status == "landing"){
                $query = $query->limit(3)->orderBy("created_at", "DESC");
            }
            $query = $query->get();
        return $query;
    }
    public function eskul()
    {
        return DB::table('m_image')
                ->where("type", 2)->where("status", 1)->get();
    }

    public function add($data)
    {
        return DB::table('m_image')->insert([$data]);
    }

    public function update($data, $id)
    {
        return DB::table('m_image')->where('uuid', $id)->update($data);
    }
}