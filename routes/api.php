<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->group(function () {
    Route::get('/requisition-slip', 'RequisitionSlipController@index');
    Route::post('/requisition-slip/create', 'RequisitionSlipController@store');
    Route::get('/requisition-slip/edit/{id}', 'RequisitionSlipController@edit');
    Route::patch('/requisition-slip/update', 'RequisitionSlipController@update');
    Route::get('/oitm/all/api', 'ApiController@getAllOITM');
    Route::post('/logout', 'AuthController@logout');
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});




Route::post('/login' , 'AuthController@login');

Route::post('/register' , 'AuthController@register');



// Route::get('/requisition-slip', 'RequisitionSlipController@index');
// Route::get('/requisition-slip', 'RequisitionSlipController@index');
// Route::get('/requisition-slip', 'RequisitionSlipController@index');


// JWT AUTH

// Route::group([

//     'prefix' => 'auth'

// ], function ($router) {

//     Route::post('login', 'AuthController@login');
//     Route::post('logout', 'AuthController@logout');
//     Route::post('refresh', 'AuthController@refresh');
//     Route::post('me', 'AuthController@me');

// });
