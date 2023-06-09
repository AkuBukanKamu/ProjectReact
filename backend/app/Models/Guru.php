<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    use HasFactory;

    protected $table = 'gurus';


    protected $fillable = [
        'unit',
        'nama',
        'tempatlahir',
        'tanggallahir',
        'no_hp',
        'gaji',
        'tanggalmasuk',
    ];

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
}
