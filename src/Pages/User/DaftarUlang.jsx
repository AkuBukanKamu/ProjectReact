import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import { apiTeacher } from "../../lib/api/admin/teacher";
import { Button, Modal, Dropdown, Form, Card, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import apiSpp from "../../lib/api/spp";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

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

function DaftarUlang() {
  const [data, setData] = useState();
  const currentDate = new Date();
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  const [show, setShow] = useState(false);
  const [idStudent, setIdStudent] = useState("");
  const [validationError, setValidationError] = useState({});
  const [dataStudent, setDataStudent] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getData = async () => {
      const res1 = await apiTeacher.dashboard();
      const res2 = await apiSpp.studentThisMonth();
      setData(res1.data.data);
      setDataStudent(res2.data.data);
    };

    getData();
  }, [show]);

  const handleSave = async (e) => {
    const body = {
      unit: data.info.unit,
      id_student: idStudent,
      nominal: 0,
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

  return (
    <Layout>
      <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
          <h3 class="fw-bold ">
            {" "}
            Pembelajaran bulan {currentMonth} {currentYear}
          </h3>
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Daftar Siswa bulan ini</h5>
            <Button variant="primary" onClick={handleShow}>
              Masukkan Siswa
            </Button>
          </div>
          <Row>
            {dataStudent?.map((card, index) => (
              <Col key={index} sm={12} md={6} lg={4}>
                <Card className="mb-4">
                  <Card.Body
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar name={card.nama_siswa} />
                    <Card.Title className="font-bold">
                      {card.nama_siswa}
                    </Card.Title>
                    <div style={{marginBottom: "4px"}}> {card.no_hp}</div>
                    <Link
                      to={`/siswa/${card.id_student}`}
                      className="btn btn-sm btn-primary"
                      style={{ width: "100%" }}
                    >
                      <i class="bx bx-view"></i> Lihat
                    </Link>{" "}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <div class="content-backdrop fade"></div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Siswa untuk bulan ini</Modal.Title>
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
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setIdStudent(e.target.value)}
          >
            <option>Pilih Siswa</option>
            {data?.students?.map((v) => (
              <option value={v.id}>{v.nama}</option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default DaftarUlang;
