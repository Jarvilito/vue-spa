<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequisitionSlipItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('FT_PRQ1', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('user_id');
            $table->string('requisition_slip_id');
            $table->string('U_ItemCode', 20);
            $table->string('U_Dscription', 100);
            $table->string('U_Scope', 100);
            $table->string('U_ScopeDesc', 100);
            $table->string('U_MaterialCode', 100);
            $table->string('U_MaterialDesc', 100);
            $table->string('U_Quantity', 19);
            $table->bigInteger('U_InfoPrice')->length(19);
            $table->string('U_UomCode', 20);
            $table->text('U_LineRemarks', 100)->nullable();
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
        Schema::dropIfExists('FT_PRQ1');
    }
}
