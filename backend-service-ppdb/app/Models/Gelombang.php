<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gelombang extends Model
{
    protected $table = "gelombang";
    protected $primaryKey ="id_gelombang";
    protected $filable = ['id_gelombang','gelombang'];
    
    public function users(){
        return $this->hasMany('App\User','gelombang_id');
    }
}
