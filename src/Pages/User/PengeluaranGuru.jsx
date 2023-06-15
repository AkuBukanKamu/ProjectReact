import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

import Layout from "../../Components/Layout";
import { apiTeacher } from "../../lib/api/admin/teacher";
import apiSpp from "../../lib/api/spp";
import { Form, Modal, Table } from "react-bootstrap";

function PengeluaranGuru() {
  const [data, setData] = useState([]);
  const [teacher, setTeacher] = useState();
  const [reloadData, setReloadData] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [keterangan, setKeterangan] = useState();
  const [kategori, setKategori] = useState();
  const [nominal, setNominal] = useState();
  const [validationError, setValidationError] = useState({});
  const [selectedId, setSelectedId] = useState();
  const role = localStorage.getItem("role");
  const [unit, setUnit] = useState();
  const currentDate = new Date();
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
    timeZoneName: "short",
  };
  const formattedDate = currentDate.toLocaleString("id-ID", options);
  const formattedTime = currentDate.toLocaleString("id-ID", optionsTime);

  useEffect(() => {
    const getData = async () => {
      await apiSpp.profileTeacher().then(({ data }) => setTeacher(data.data));
      await apiSpp.pengeluaran().then(({ data }) => setData(data.data));
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
    await apiSpp
      .deletePengeluaran(id)
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
  const handleSave = async (e) => {
    const body = {
      unit: role === "user" ? teacher.unit : unit,
      kategori: kategori,
      keterangan: keterangan,
      nominal: nominal,
    };
    if (selectedId) {
      await apiSpp
        .updatePengeluaran(selectedId, body)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
          setReloadData(!reloadData);
          setShowAdd(false);
          setSelectedId("");
        })
        .catch(({ response }) => {
          if (response.status === 422) {
            setValidationError(response.data.errors);
          } else {
            Swal.fire({
              text: response.data.message,
              icon: "error",
            });
          }
        });
    } else {
      await apiSpp
        .storePengeluaran(body)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.message,
          });
          setReloadData(!reloadData);
          setShowAdd(false);
        })
        .catch(({ response }) => {
          if (response.status === 422) {
            setValidationError(response.data.errors);
          } else {
            Swal.fire({
              text: response.data.message,
              icon: "error",
            });
          }
        });
    }
  };

  return (
    <Layout>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            Pengeluaran Unit {teacher?.unit}
          </h4>
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <Button
                variant="primary"
                onClick={() => {
                  setNominal("");
                  setKeterangan("");
                  setKategori("");
                  setSelectedId("");
                  setShowAdd(true);
                }}
              >
                Tambah Pengeluaran
              </Button>
            </div>
            <div className="card-body">
              <div className="table-responsive text-nowrap">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Waktu</th>
                      {role === "admin" && <th>Unit</th>}
                      <th>Kategori</th>
                      <th>Keterangan</th>
                      <th>Nominal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((row, key) => {
                      const date = new Date(row.created_at);
                      const formattedDate = date.toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      return (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{formattedDate}</td>
                          {role === "admin" &&
                          <td>{row.unit}</td>}
                          <td>{row.kategori}</td>
                          <td>{row.keterangan ?? "-"}</td>
                          <td>{row.nominal}</td>
                          <td>
                            {" "}
                            <Button
                              variant="primary"
                              onClick={() => {
                                setKategori(row.kategori);
                                setNominal(row.nominal);
                                setKeterangan(row.keterangan);
                                setSelectedId(row.id);
                                setShowAdd(true);
                              }}
                            >
                              <i className="bx bx-edit"></i> Edit
                            </Button>{" "}
                            &nbsp;
                            <Button
                              onClick={() => deleteGuru(row.id)}
                              style={{
                                backgroundColor: "red",
                                borderColor: "red",
                              }}
                              className="btn btn-sm"
                            >
                              <i className="bx bx-trash"></i> Hapus
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pengeluaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(validationError).length > 0 && (
            <div className="row">
              <div className="col-12">
                <div className="alert alert-danger">
                  <ul className="mb-0">
                    {Object.entries(validationError).map(([key, value]) => (
                      <li key={key}>{value}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          <Table borderless>
            <tbody>
              {role === "user" && (
                <tr>
                  <td>Unit</td>
                  <th>{teacher?.unit}</th>
                </tr>
              )}
              <tr>
                <td>Tanggal</td>
                <th>{formattedDate}</th>
              </tr>
              <tr>
                <td>Waktu</td>
                <th>{formattedTime}</th>
              </tr>
              {role === "admin" && (
                <tr>
                  <td>Unit</td>
                  <th>
                    {" "}
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => setUnit(e.target.value)}
                    >
                      <option value="" hidden>
                        Pilih Unit
                      </option>
                      <option value="Kenongo">Kenongo</option>
                      <option value="Magersari">Magersari</option>
                      <option value="Surodinawan">Surodinawan</option>
                    </Form.Select>
                  </th>
                </tr>
              )}
              <tr>
                <td>Kategori</td>
                <th>
                  {" "}
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setKategori(e.target.value)}
                  >
                    <option value="" hidden>
                      Pilih Kategori
                    </option>
                    {role === "admin" && <option value="Gaji">Gaji</option>}
                    <option value="Listrik">Listrik</option>
                    <option value="ATK">Alat Tulis dan Kantor</option>
                    <option value="lain-lain">Lain lain</option>
                  </Form.Select>
                </th>
              </tr>{" "}
              <tr>
                <td>Keterangan</td>
                <th>
                  <Form.Control
                    min={1}
                    placeholder="Keterangan"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                  />
                </th>
              </tr>
              <tr>
                <td>Nominal</td>
                <th>
                  <Form.Control
                    type="number"
                    min={1}
                    placeholder="Rp..."
                    value={nominal}
                    onChange={(e) => setNominal(e.target.value)}
                  />
                </th>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!keterangan || !kategori || !nominal}
          >
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default PengeluaranGuru;
