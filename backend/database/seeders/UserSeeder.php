<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{

    public function run()
    {
        DB::table('users')->insert([
            'name'      => 'admin',
            'email'     => 'admin@gmail.com',
            'password'  => Hash::make('admin'),
            'level'     => 'admin',
        ]);

        DB::table('users')->insert([
            'name'      => 'budi',
            'email'     => 'budi@gmail.com',
            'password'  => Hash::make('user'),
            'level'     => 'user',
        ]);

        DB::table('gurus')->insert([
            'id_user' => '2',
            'nama' => 'Budi',
            'unit' => 'Kenongo',
            'tempat_lahir' => 'Mojokerto',
            'tanggal_lahir' => '1995-12-11 10:59:52',
            'no_hp' => '085159159159',
            'gaji' => '4500000',
            'tanggal_masuk' => '2022-10-21 15:39:12'
        ]);

        DB::table('murids')->insert([
            'id_guru' => '1',
            'nama' => 'Ipin',
            'unit' => 'Kenongo',
            'tempat_lahir' => 'Mojokerto',
            'tanggal_lahir' => '1995-12-11 10:59:52',
            'umur' => '6',
            'no_hp' => '085159159159',
            'spp' => '4500000',
            'tanggal_masuk' => '2022-10-21 15:39:12',
            'alamat' => 'Jl. Gedangan'
        ]);

        DB::table('murids')->insert([
            'id_guru' => '1',
            'nama' => 'Ehsan',
            'unit' => 'Kenongo',
            'tempat_lahir' => 'Sidoarjo',
            'tanggal_lahir' => '1999-12-11 10:59:52',
            'umur' => '6',
            'no_hp' => '085159159159',
            'spp' => '4500000',
            'tanggal_masuk' => '2022-10-21 15:39:12',
            'alamat' => 'Jl. Gedangan'
        ]);

        DB::table('spps')->insert([
            'id_teacher' => '1',
            'id_student' => '1',
            'unit' => 'Kenongo',
            'nominal' => 0,
            'created_at' => '2023-06-13 23:01:33'
        ]);

        DB::table('pengeluarans')->insert([
            'unit' => 'Kenongo',
            'kategori' => 'Gaji',
            'nominal' => 10000000,
            'keterangan' => 'Juni 2023',
            'created_at' => '2023-06-13 23:01:33'
        ]);

        DB::table('pengeluarans')->insert([
            'unit' => 'Kenongo',
            'kategori' => 'Listrik',
            'nominal' => 200000,
            'created_at' => '2023-06-13 23:01:33'
        ]);
    }
}
