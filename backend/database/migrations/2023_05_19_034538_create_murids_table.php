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
            $table->enum('unit', ['Kenongo', 'Magersari', 'Surodinawan']);
            $table->unsignedBigInteger('id_guru');
            $table->string('nama');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->integer('umur');
            $table->string('no_hp');
            $table->text('alamat');
            $table->bigInteger('spp');
            $table->string('tanggal_masuk');
            $table->timestamps();

            $table->foreign('id_guru')->references('id')->on('gurus');
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
