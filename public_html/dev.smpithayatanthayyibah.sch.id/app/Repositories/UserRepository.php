<?php

namespace App\Repositories;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use DB;

class UserRepository
{
    public function index()
    {
        dd("INI REPO");
    }
    public function getByIdRegistrasi($regId)
    {
        return DB::table('users')->where('id_registrasi', 'like', '%'.$regId.'%')->first();
    }
}