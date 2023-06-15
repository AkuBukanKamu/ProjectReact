<?php

namespace Database\Seeders;

use App\Models\Guru;
use App\Models\Murid;
use App\Models\Pengeluaran;
use App\Models\Spp;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{

    public function run()
    {
        $faker = Faker::create();

        DB::table('users')->insert([
            'name'      => 'admin',
            'email'     => 'admin@gmail.com',
            'password'  => Hash::make('admin'),
            'level'     => 'admin',
        ]);

        for ($idUser = 2; $idUser < 10; $idUser++) {
            $name = $faker->name;
            DB::table('users')->insert([
                'name' => $name,
                'email' => $faker->email,
                'password' => Hash::make("123456"),
                'level' => 'user'
            ]);

            $units = ['Surodinawan', 'Kenongo', 'Magersari'];
            $randomIndex = array_rand($units);
            $unit = $units[$randomIndex];
            $teacher = Guru::create([
                'id_user' => $idUser,
                'nama' => $name,
                'unit' => $unit,
                'tempat_lahir' => $faker->city,
                'tanggal_lahir' => $faker->dateTimeBetween('-60 years', '-18 years')->format('Y-m-d'),
                'no_hp' => $faker->phoneNumber,
                'gaji' => 1000000,
                'tanggal_masuk' => $faker->dateTimeThisYear()->format('Y-m-d')
            ]);

            for ($j = 0; $j < $faker->numberBetween(5, 10); $j++) {
                $birthDate = $faker->dateTimeBetween('-20 years', '-7 years')->format('Y-m-d');
                $currentDate = date('Y-m-d');
                $age = date_diff(date_create($birthDate), date_create($currentDate))->y;

                $student = Murid::create([
                    'id_guru' => $teacher->id,
                    'nama' => $faker->name,
                    'unit' => $unit,
                    'tempat_lahir' => $faker->city,
                    'tanggal_lahir' => $birthDate,
                    'umur' => $age,
                    'no_hp' => $faker->phoneNumber,
                    'spp' => 500000,
                    'tanggal_masuk' => $faker->dateTimeThisYear()->format('Y-m-d'),
                    'alamat' => $faker->city
                ]);

                Spp::create([
                    'id_teacher' => $teacher->id,
                    'id_student' => $student->id,
                    'unit' => $unit,
                    'nominal' => 500000,
                    'created_at' =>  $faker->dateTimeThisYear()->format('Y-m-d')
                ]);
            }

            for ($k = 0; $k < $faker->numberBetween(1, 3); $k++) {

                $categories = ['Listrik', 'ATK', 'lain-lain'];
                $randomArray = array_rand($categories);
                $category = $categories[$randomArray];
                if ($k === 0) {
                    Pengeluaran::create([
                        'unit' => $unit,
                        'kategori' => 'Gaji',
                        'nominal' => 1000000,
                        'keterangan' => $faker->word(),
                        'created_at' => $faker->dateTimeThisYear()->format('Y-m-d')
                    ]);
                } else{
                    Pengeluaran::create([
                        'unit' => $unit,
                        'kategori' => $category,
                        'nominal' => $faker->numberBetween(10, 100) * 1000,
                        'keterangan' => $faker->word(),
                        'created_at' => $faker->dateTimeThisYear()->format('Y-m-d')
                    ]);
                }
            }
        }
    }
}
