<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Oitm;

class ApiController extends Controller
{
    public function getAllOITM()
    {

        $result = Oitm::select('ItemCode', 'ItemName', 'BuyUnitMsr', 'OnHand', 'InvntryUoM')->where('validFor', 'Y')->get();            
        return $result;

    }
}
