import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import apiStudent from "../../lib/api/admin/student";
import { convertDate } from "../../lib/utils/dateFormatter";

function ProfilSiswa() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      await apiStudent.profile(id).then(({ data }) => {
        setData(data.murid);
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
                          {data?.tempat_lahir}, {convertDate(data?.tanggal_lahir)}
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
                        <th>{convertDate(data?.tanggal_masuk)}</th>
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
