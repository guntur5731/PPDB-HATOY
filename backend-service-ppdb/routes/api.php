<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\JurusanController;
use App\Http\Controllers\Api\PesertaController;
use App\Http\Controllers\Api\GelombangController;
use App\Http\Controllers\Api\NilaiController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\LandingController;

Route::controller(LandingController::class)->group(function(){
    Route::get('landing', 'index');
});

Route::controller(RegisterController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::get('gelombangPendaftaran', 'gelombang');
});

Route::controller(PesertaController::class)->group(function(){
    Route::post('lupa-password', 'lupaPassword');
    Route::post('chek-token', 'checkToken');
    Route::post('change-password', 'changePassword');
});

Route::middleware('auth:sanctum')->group( function () {
    
    Route::controller(JurusanController::class)->group(function(){
        Route::post('jurusan', 'add');
        Route::get('jurusan', 'index');
        Route::patch('jurusan', 'update');
    });

    Route::controller(LandingController::class)->group(function(){
        Route::get('image-list', 'imageLandingList');
        Route::post('uploadImage', 'imageLanding');
        Route::patch('uploadImage', 'imageLandingUpdate');
        Route::patch('image-list', 'imageLandingDelete');
    });

    Route::controller(PesertaController::class)->group(function(){
        Route::get('list-peserta', 'index');
        Route::post('verifikasi-peserta', 'verifikasi');
        Route::get('detail-peserta', 'detailPeserta');
        Route::post('detail-peserta', 'updatePeserta');
        Route::get('listpeserta', 'listPeserta');
        Route::post('upload-peserta', 'uploadPeserta');
        Route::post('update-bio', 'updateBio');
        Route::get('get-peserta', 'getPeserta');
        Route::get('dashboard', 'dashboard');
    });

    Route::controller(HomeController::class)->group(function(){
        Route::get('home', 'index');
        Route::get('biaya', 'biaya');
        Route::post('biaya', 'biayaUpdate');
    });

    Route::controller(GelombangController::class)->group(function(){
        Route::get('gelombang', 'index');
        Route::post('gelombang', 'add');
        Route::patch('gelombang', 'delete');
        Route::put('gelombang', 'update');
        Route::get('listBygelombang', 'listByGelombang');
    });

    Route::controller(NilaiController::class)->group(function(){
        Route::get('nilai', 'index');
        Route::post('nilai', "inputNilai");
        Route::post('upload-nilai', "uploadNilai");
        Route::get('download-Nilai', "downloadNilai");
    });

    Route::controller(UploadController::class)->group(function(){
        Route::post('upload-file', 'upload');
    });

});