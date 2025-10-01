<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeKelas extends Model
{
    protected $table = 'type_kelas';
    protected $primaryKey = 'id_type';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id_type'
        ,'nama'
        ,'status'
        ,'created_at'
        ,'created_by'
        ,'updated_at'
        ,'updated_by'
    ];
}