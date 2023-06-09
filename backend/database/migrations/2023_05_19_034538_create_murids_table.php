<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMuridsTable extends Migration
{
    public function up()
    {
        Schema::create('murids', function (Blueprint $table) {
            $table->id();
            $table->enum('unit', ['kenongo','magersari','surodinawan']);
            $table->string('nama');
            $table->string('namaguru');
            $table->integer('umur');
            $table->string('nohp');
            $table->text('alamat');
            $table->string('tglmasuk');
            $table->bigInteger('spp');
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
        Schema::dropIfExists('murids');
    }
}
