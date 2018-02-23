<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWebcamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('webcams', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
            $table->string('location', 50);
            $table->string('url');
            $table->double('latitude', 9, 6);
            $table->double('longitude', 9, 6);
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
        Schema::dropIfExists('webcams');
    }
}
