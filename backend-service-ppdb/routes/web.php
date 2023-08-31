<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NilaiController;
use App\Http\Controllers\Api\PesertaController;
use App\Http\Controllers\MailController;

Route::get('send-mail', [MailController::class, 'index']);
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::controller(NilaiController::class)->group(function(){
    Route::get('download-Nilai', "downloadNilai");
});

Route::controller(PesertaController::class)->group(function(){
    Route::get('download-peserta', 'downloadPeserta');
});


