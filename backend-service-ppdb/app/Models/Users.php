<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $guarded = [];
    protected $table = 'users';
    public $timestamps = false;

}
