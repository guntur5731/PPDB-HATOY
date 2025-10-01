<?php

namespace App\Http\Import;

use App\Models\Users;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SiswaImport implements ToModel , WithHeadingRow
{
    
    public function model(array $row)
    {
            $spp = new Users([
                'name' => $row['nama']
            ]);

        return $spp;
    }
}
