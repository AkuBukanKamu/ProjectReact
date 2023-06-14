import React, { useEffect, useState } from "react";

import Layout from "../../Components/Layout";
import apiSpp from "../../lib/api/spp";
import { Table } from "react-bootstrap";

function Profil() {
  const [data, setData] = useState();
  const [tanggal_lahir, setTanggalLahir] = useState();

  useEffect(() => {
    const getData = async () => {
      await apiSpp.profileTeacher().then(({ data }) => {
        setData(data.data);
        var parts = data.data.tanggal_lahir?.split("-"); // Split the original date by the hyphen (-)

        var year = parts[0];
        var month = parts[1];
        var day = parts[2];

        var formattedDate = day + "-" + month + "-" + year;
        setTanggalLahir(formattedDate)
      });
    };
    getData();
  }, []);

  return (
    <Layout>
      <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
          <h4 class="fw-bold py-3 mb-4">Profil</h4>
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
                        <td>Gaji</td>
                        <th>{data?.gaji}</th>
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

export default Profil;
