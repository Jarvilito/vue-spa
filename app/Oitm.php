<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Oitm extends Model
{
    protected $connection = "sqlsrv2";
    protected $table = "oitm";
    protected $guarded = [];
}