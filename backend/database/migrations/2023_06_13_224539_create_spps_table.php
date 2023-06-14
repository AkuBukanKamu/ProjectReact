<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSppsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('spps', function (Blueprint $table) {
            $table->id();
            $table->enum('unit', ['Kenongo','Magersari','Surodinawan']);
            $table->unsignedBigInteger('id_teacher');
            $table->unsignedBigInteger('id_student');
            $table->string('nominal');
            $table->timestamps();

            $table->foreign('id_teacher')->references('id')->on('users');
            $table->foreign('id_student')->references('id')->on('murids');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('spps');
    }
}
