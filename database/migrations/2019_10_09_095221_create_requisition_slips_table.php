<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequisitionSlipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            Schema::create('FT_OPRQ', function (Blueprint $table) {
                $table->bigIncrements('DocEntry');
                $table->unsignedInteger('user_id');
                $table->string('U_ProjectID', 20); //project_id
                $table->string('U_ProjName', 100);
                $table->string('U_CardCode', 20)->nullable();
                $table->string('card_name')->nullable();
                $table->string('U_PrefSupplier', 100)->nullable();
                $table->integer('U_DocNum')->length(11);
                $table->string('U_DocStatus', 1);
                $table->string('U_Location', 100);
                $table->date('U_TaxDate');
                $table->date('U_ReqDate');
                $table->string('U_Urgency', 100);
                $table->string('U_CheckedBy', 100)->nullable();
                $table->string('U_PreparedBy', 100);
                $table->string('U_Comments', 254)->nullable();
                $table->string('U_IsUpload', 1)->default('N');
                $table->timestamps();
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('requisition_slips');
    }
}
