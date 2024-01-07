<?php

namespace App\Repositories;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use DB;
class ParamRepository
{
    public function index($key)
    {
        return DB::table('m_params')->where("keys", $key)->first();
    }
}