import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import apiSpp from "../../lib/api/spp";
import { Button, Form, Modal, Table } from "react-bootstrap";
import Swal from "sweetalert2";

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function SPP() {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
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
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  const formattedDate = currentDate.toLocaleString("id-ID", options);
  const formattedTime = currentDate.toLocaleString("id-ID", optionsTime);
  const [selectedData, setSelectedData] = useState();
  const [validationError, setValidationError] = useState({});
  const [nominal, setNominal] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await apiSpp.studentThisMonth();
      setData(res.data.data);
    };

    getData();
  }, [show]);

  const handleBayar = async () => {
    const body = {
      unit: selectedData.unit,
      id_student: selectedData.id_student,
      nominal: nominal,
    };
    await apiSpp
      .store(body)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        setShow(false);
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
  };

  const handleClose = () => setShow(false);

  return (
    <Layout>
      <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
          <h3 class="fw-bold ">Pembayaran SPP</h3>
          <div class="mb-4">
            {currentMonth} {currentYear}
          </div>
          <div class="card">
            <div class="card-body">
              <div class="table-responsive text-nowrap">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Unit</th>
                      <th>Katetori</th>
                      <th>Keterangan</th>
                      <th>Nominal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((row, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{row.nama_siswa}</td>
                        <td>{row.no_hp}</td>
                        <td>
                          {row.nominal === 0 ? "Belum Bayar" : row.nominal}
                        </td>
                        <td>
                          {" "}
                          <Button
                            variant={row.nominal !== 0 ? "success" : "primary"}
                            onClick={() => {
                              setSelectedData(row);
                              setShow(true);
                            }}
                            disabled={row.nominal !== 0}
                          >
                            {row.nominal !== 0 ? "Lunas" : "Bayar"}
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Pembayaran</Modal.Title>
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
              <tr>
                <td>Name</td>
                <th>{selectedData?.nama_siswa}</th>
              </tr>
              <tr>
                <td>No HP</td>
                <th>{selectedData?.no_hp}</th>
              </tr>
              <tr>
                <td>Periode</td>
                <th>
                  {currentMonth} {currentYear}
                </th>
              </tr>
              <tr>
                <td>Tanggal Pembayaran</td>
                <th>{formattedDate}</th>
              </tr>
              <tr>
                <td>Waktu Pembayaran</td>
                <th>{formattedTime}</th>
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
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleBayar} disabled={!nominal}>
            Bayar
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default SPP;
