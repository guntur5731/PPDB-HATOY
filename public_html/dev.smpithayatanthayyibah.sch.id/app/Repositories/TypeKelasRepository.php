<?php

namespace App\Repositories;

use App\Utils\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\TypeKelas;
use App\Models\DetailJenisPembayaran;
use DB;
class TypeKelasRepository
{
    public function index()
    {
        return TypeKelas::where('status', 1)->get();
    }

    public function save($data)
    {
        return TypeKelas::create($data);
    }

    public function update($id, $data)
    {
        return TypeKelas::find($id)->update($data);
    }

    public function filterByTahun($idTahun)
    {
        return TypeKelas::select('id_type as value', 'nama as label')
                        ->whereNotIn('id_type', DetailJenisPembayaran::where('id_tahun', '=', $idTahun)
                            ->select('id_type')
                            ->distinct('id_type')
                            ->get()
                            ->pluck('id_type')
                            ->toArray())
                        ->get()->toArray();
    }
}