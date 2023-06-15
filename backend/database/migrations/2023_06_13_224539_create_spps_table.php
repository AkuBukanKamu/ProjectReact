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
            $table->unsignedBigInteger('id_teacher')->nullable();
            $table->unsignedBigInteger('id_student')->nullable();
            $table->bigInteger('nominal');
            $table->timestamps();

            $table->foreign('id_teacher')->references('id')->on('users')->onDelete('set null');
            $table->foreign('id_student')->references('id')->on('murids')->onDelete('set null');
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
