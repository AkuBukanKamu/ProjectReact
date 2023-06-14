import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import { apiTeacher } from "../../lib/api/admin/teacher";

function Dashboard() {
  const [data, setData] = useState();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 4 && currentHour < 12) {
      setGreeting("Selamat Pagi");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Selamat Siang");
    } else if (currentHour >= 18 && currentHour < 20) {
      setGreeting("Selamat Sore");
    } else {
      setGreeting("Selamat Malam");
    }
  }, []);
  
  useEffect(() => {
    const getData = async () => {
      const res = await apiTeacher.dashboard();
      setData(res.data.data);
    };

    getData();
  }, []);

  return (
    <Layout>
      <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
          <h3 class="fw-bold ">
            {" "}
            {greeting} {data?.name}
          </h3>
          <div class="mb-4">
            Anda saat ini mengajar di Unit {data?.info?.unit}
          </div>
          <div class="card">
            <div class="card-body">
            <div> Berikut ini daftar siswa anda</div>
              <div class="table-responsive text-nowrap">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Umur</th>
                      <th>No Hp</th>
                      <th>Alamat</th>
                      <th>SPP</th>
                      <th>Tanggal Masuk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.students?.map((row, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{row.nama}</td>
                        <td>{row.umur}</td>
                        <td>{row.no_hp}</td>
                        <td>{row.alamat}</td>
                        <td>{row.spp}</td>
                        <td>{row.tanggal_masuk?.split(" ")[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="content-backdrop fade"></div>
      </div>
    </Layout>
  );
}

export default Dashboard;
