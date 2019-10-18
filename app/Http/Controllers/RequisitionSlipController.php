<?php

namespace App\Http\Controllers;

use App\RequisitionSlip;
use App\RequisitionSlipLineDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        
        $requisitionSlipId = $requisition->DocEntry;
        
        foreach($lineDetailsArray as $key => $lineDetailArray)
        {
            RequisitionSlipLineDetails::create([
                'user_id' => auth()->user()->id,
                'requisition_slip_id' => $requisitionSlipId,
                'U_ItemCode'    => $lineDetailsArray[$key]['itemCode'],
                'U_Dscription'  => $lineDetailsArray[$key]['itemDescription'],
                'U_Scope'  => $lineDetailsArray[$key]['scopeOfWork'],
                'U_ScopeDesc'  => $lineDetailsArray[$key]['scopeDescription'],
                'U_MaterialCode'  => $lineDetailsArray[$key]['materialCode'],
                'U_MaterialDesc'  => $lineDetailsArray[$key]['materialDescription'],
                'U_Quantity'  => $lineDetailsArray[$key]['quantity'],
                'U_InfoPrice'  => $lineDetailsArray[$key]['infoPrice'],
                'U_UomCode'  => $lineDetailsArray[$key]['uom'],
                'U_LineRemarks'  => $lineDetailsArray[$key]['lineRemarks'],
            ]);
        }


        
        
        

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
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\RequisitionSlip  $requisitionSlip
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $header = DB::table('FT_OPRQ')
                        ->where('DocEntry', $id)
                        ->get();
        
        $line_details = DB::table('FT_PRQ1')
                            ->where('requisition_slip_id', $id)
                            ->get();

        $result = [
            'header' => $header, 
            'lineDetails' => $line_details
                            ];
        return response()->json($result);
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
