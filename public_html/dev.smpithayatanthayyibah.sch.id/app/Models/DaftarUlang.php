<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DaftarUlang extends Model
{
    protected $table = "tr_daftar_ulang";
    protected $primaryKey ="id";

    protected $hidden = [
        'id',
        'created_by',
        'updated_by',
        'user_id',
        'status',
        'code',
        'updated_at'
    ];
}
