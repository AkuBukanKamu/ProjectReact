<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Guru extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $table = 'gurus';


    protected $fillable = [
        'unit',
        'nama',
        'tempat_lahir',
        'tanggal_lahir',
        'no_hp',
        'gaji',
        'tanggal_masuk',
    ];

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
