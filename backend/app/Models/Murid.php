<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Murid extends Model
{
    use HasFactory;

    protected $table = 'murids';

    protected $fillable = [
        'unit',
        'nama',
        'namaguru',
        'umur',
        'nohp',
        'alamat',
        'spp',
        'tanggalmasuk',
    ];
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
}
