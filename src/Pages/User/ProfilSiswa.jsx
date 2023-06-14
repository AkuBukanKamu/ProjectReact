import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import TextField from "../../Components/FormInput/TextField";
import SelectForm from "../../Components/FormInput/SelectForm";
import apiSpp from "../../lib/api/spp";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import apiStudent from "../../lib/api/admin/student";

function ProfilSiswa() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [tanggal_lahir, setTanggalLahir] = useState();
  const [tanggalMasuk, setTanggalMasuk] = useState();

  useEffect(() => {
    const getData = async () => {
      await apiStudent.profile(id).then(({ data }) => {
        setData(data.murid);
        var parts = data.murid.tanggal_lahir?.split("-"); // Split the original date by the hyphen (-)

        var year = parts[0];
        var month = parts[1];
        var day = parts[2];

        var formattedDate = day + "-" + month + "-" + year;
        setTanggalLahir(formattedDate);


        var parts2 = data.murid.tanggal_masuk?.split("-"); // Split the original date by the hyphen (-)

        var year2 = parts2[0];
        var month2 = parts2[1];
        var day2 = parts2[2].split(" ")[0];

        var formattedDate2 = day2 + "-" + month2 + "-" + year2;
        setTanggalMasuk(formattedDate2);
      });
    };
    getData();
  }, []);

  return (
    <Layout>
      <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
          <h4 class="fw-bold py-3 mb-4">Siswa</h4>
          <div class="row">
            <div class="col-xl">
              <div class="card mb-12">
                <div class="card-body">
                  <Table borderless>
                    <tbody>
                      <tr>
                        <td>Nama</td>
                        <th>{data?.nama}</th>
                      </tr>
                      <tr>
                        <td>Usia</td>
                        <th>{data?.umur} Tahun</th>
                      </tr>
                      <tr>
                        <td>Unit</td>
                        <th>{data?.unit}</th>
                      </tr>
                      <tr>
                        <td>No. HP</td>
                        <th>{data?.no_hp}</th>
                      </tr>
                      <tr>
                        <td>Tempat, Tanggal Lahir</td>
                        <th>
                          {data?.tempat_lahir}, {tanggal_lahir}
                        </th>
                      </tr>
                      <tr>
                        <td>Alamat</td>
                        <th>
                          {data?.alamat}
                        </th>
                      </tr>
                      <tr>
                        <td>TanggalMasuk</td>
                        <th>{tanggalMasuk}</th>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilSiswa;
