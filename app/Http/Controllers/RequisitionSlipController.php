<?php

namespace App\Http\Controllers;

use App\RequisitionSlip;
use Illuminate\Http\Request;

class RequisitionSlipController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return RequisitionSlip::where('user_id', auth()->user()->id)->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {







    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $lineDetailsArray = $request->lineDetails;
        return $lineDetails;
        return $request->lineDetails[1]['itemCode'];
        // $lineDetails =  $request->input('form.lineDetails');
        
        // foreach( $lineDetails as $key => $lineDetail)
        // {
        //     return $lineDetails[$key]->itemCode;
        // }

        // $item_code              = $request->get('itemCode');

        // return $item_code;
        // $item_descriptions       = $request->get('item_description');
        // $scope_of_work          = $request->get('scope_of_work');    
        // $scope_description      = $request->get('scope_description');    
        // $material_code          = $request->get('material_code');    
        // $material_description   = $request->get('material_description');    
        // $quantity               = $request->get('quantity');    
        // $info_price             = $request->get('info_price');    
        // $uom                    = $request->get('uom');    
        // $line_remarks           = $request->get('line_remarks');


        $requisition = RequisitionSlip::create([
            'U_ProjectID' => $request->projectId,
            'user_id' => auth()->user()->id,
            'U_ProjName' => $request->projectName,
            'U_Location' => $request->location,
            'card_name'  => 'Kahit ano',
            'U_CardCode' => $request->supplier,
            'U_PrefSupplier' => $request->preferredSupplier,
            'U_PreparedBy' => $request->preparedBy,
            'U_DocNum' => $request->documentNumber,
            'U_DocStatus' => $request->status,
            'U_TaxDate' => $request->documentDate,
            'U_ReqDate' => $request->requiredDate,
            'U_Urgency' => $request->urgencyPriority,
            'U_CheckedBy' => $request->checkedBy,
        ]);

        
        // foreach($)


        
        
        

        return response($requisition, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\RequisitionSlip  $requisitionSlip
     * @return \Illuminate\Http\Response
     */
    public function show(RequisitionSlip $requisitionSlip)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\RequisitionSlip  $requisitionSlip
     * @return \Illuminate\Http\Response
     */
    public function edit(RequisitionSlip $requisitionSlip)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\RequisitionSlip  $requisitionSlip
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RequisitionSlip $requisitionSlip)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RequisitionSlip  $requisitionSlip
     * @return \Illuminate\Http\Response
     */
    public function destroy(RequisitionSlip $requisitionSlip)
    {
        //
    }
}
