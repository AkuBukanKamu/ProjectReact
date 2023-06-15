import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

import Nav from "../../../Components/Nav";
import Sidebar from "../../../Components/Sidebar";
import { apiTeacher } from "../../../lib/api/admin/teacher";
import { convertDate } from "../../../lib/utils/dateFormatter";
import { rupiahFormatter } from "../../../lib/utils/currencyFormatter";
import { excelDownloader } from "../../../lib/utils/excelDownloader";
import Layout from "../../../Components/Layout";

function DataGuru() {
  const [data, setData] = useState();
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await apiTeacher.index().then(({ data }) => setData(data));
    };

    getData();
  }, [reloadData]);

  const deleteGuru = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You wont be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }
    await apiTeacher
      .deleted(id)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        setReloadData(!reloadData);
      })
      .catch(({ Response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  const handleDownload = () => {
    const rows = data.map((v, i) => {
      return {
        No: i + 1,
        Unit: v.unit,
        Nama: v.nama,
        "Tempat Lahir": v.tempat_lahir,
        "Tanggal Lahir": convertDate(v.tanggal_lahir),
        "No HP": v.no_hp,
        Gaji: rupiahFormatter(v.gaji),
        "Tanggal Masuk": convertDate(v.tanggal_masuk),
      };
    });

    excelDownloader(rows, "Guru.xlsx");
  };

  return (
    <Layout>
      <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
          <h4 class="fw-bold py-3 mb-4">Data Guru</h4>
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <Link to={"/guru/create"} class="btn btn-primary float-end">
                <i class="bx bx-plus"></i> Tambah Data
              </Link>
              <Button variant="success" onClick={handleDownload}>
                Export
              </Button>
            </div>
            <div class="card-body">
              <div class="table-responsive text-nowrap">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Unit</th>
                      <th>Nama</th>
                      <th>Tempat Lahir</th>
                      <th>Tanggal Lahir</th>
                      <th>No HP</th>
                      <th>Gaji</th>
                      <th>Tanggal Masuk</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((row, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{row.unit}</td>
                        <td>{row.nama}</td>
                        <td>{row.tempat_lahir}</td>
                        <td>{convertDate(row.tanggal_lahir)}</td>
                        <td>{row.no_hp}</td>
                        <td>{rupiahFormatter(row.gaji)}</td>
                        <td> {convertDate(row.tanggal_masuk)}</td>
                        <td>
                          <Link
                            to={`/guru/edit/${row.id}`}
                            className="btn btn-sm btn-primary"
                          >
                            <i class="bx bx-edit"></i> Edit
                          </Link>{" "}
                          &nbsp;
                          <Button
                            onClick={() => deleteGuru(row.id)}
                            style={{
                              backgroundColor: "red",
                              borderColor: "red",
                            }}
                            className="btn btn-sm"
                          >
                            <i class="bx bx-trash"></i> Hapus
                          </Button>
                        </td>
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

export default DataGuru;
