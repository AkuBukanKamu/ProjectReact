import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import apiSpp from "../../lib/api/spp";
import { Button, Form, Modal, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import {
  convertDate,
  convertPeriode,
  dateNow,
  timeNow,
} from "../../lib/utils/dateFormatter";
import { rupiahFormatter } from "../../lib/utils/currencyFormatter";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    width: "40%",
  },
  value: {
    width: "60%",
  },
});

function SPP() {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const currentDate = new Date();
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

  const MyDocument = ({ dataPDF }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Invoice</Text>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.label}>Invoice No:</Text>
            <Text style={styles.value}>{dataPDF?.id}</Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.label}>Tanggal Pembayaran:</Text>
            <Text style={styles.value}>{convertDate(dataPDF?.created_at)}</Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.label}>Nama Siswa:</Text>
            <Text style={styles.value}>{dataPDF?.nama_siswa}</Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.label}>Periode:</Text>
            <Text style={styles.value}>
              {convertPeriode(dataPDF?.created_at)}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.label}>Biaya SPP:</Text>
            <Text style={styles.value}>
              {rupiahFormatter(dataPDF?.nominal)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <Layout>
      <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
          <h3 class="fw-bold ">Pembayaran SPP</h3>
          <div class="mb-4">{convertPeriode(currentDate)}</div>
          <div class="card">
            <div class="card-body">
              <div class="table-responsive text-nowrap">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Unit</th>
                      <th>No HP</th>
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
                          {row.nominal === 0
                            ? "Belum Bayar"
                            : rupiahFormatter(row.nominal)}
                        </td>
                        <td>
                          {row.nominal !== 0 ? (
                            <PDFDownloadLink
                              document={<MyDocument dataPDF={row} />}
                              fileName="invoice.pdf"
                            >
                              {({ blob, url, loading, error }) =>
                                loading ? (
                                  "Loading document..."
                                ) : (
                                  <Button variant="success">Download</Button>
                                )
                              }
                            </PDFDownloadLink>
                          ) : (
                            <Button
                              variant={
                                row.nominal !== 0 ? "success" : "primary"
                              }
                              onClick={() => {
                                setSelectedData(row);
                                if (row.nominal === 0) {
                                  setShow(true);
                                }
                              }}
                            >
                              Bayar{" "}
                            </Button>
                          )}
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
                <th>{convertPeriode(currentDate)}</th>
              </tr>
              <tr>
                <td>Tanggal Pembayaran</td>
                <th>{dateNow()}</th>
              </tr>
              <tr>
                <td>Waktu Pembayaran</td>
                <th>{timeNow()}</th>
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
