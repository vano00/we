<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
  $router->get('webcams',  ['uses' => 'WebcamController@showAllWebcams']);

  $router->get('webcams/{id}', ['uses' => 'WebcamController@showOneWebcam']);

  $router->post('/auth/login', ['uses' => 'AuthController@loginPost']);
});

$router->group(['prefix' => 'api','middleware' => 'auth'], function () use ($router) {
  $router->post('webcams', ['uses' => 'WebcamController@create']);

  $router->delete('webcams/{id}', ['uses' => 'WebcamController@delete']);

  $router->put('webcams/{id}', ['uses' => 'WebcamController@update']);

  $router->post('users', ['uses' => 'UserController@create']);
});
