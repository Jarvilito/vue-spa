<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class RequisitionSlip extends Model
{
    protected $table = "FT_OPRQ";

    protected $primaryKey = 'DocEntry';
    
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
