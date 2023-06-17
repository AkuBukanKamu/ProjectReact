import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import apiUser from "../../lib/api/admin/user";
import { convertDate } from "../../lib/utils/dateFormatter";
import { excelDownloader } from "../../lib/utils/excelDownloader";
import { Button, Dropdown } from "react-bootstrap";
import { rupiahFormatter } from "../../lib/utils/currencyFormatter";

function Pemasukan() {
  const [data, setData] = useState();
  const [selectedOption, setSelectedOption] = useState("Filter");
  const [monthsOptions, setMonthOptions] = useState([]);

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await apiUser.income(selectedOption === "Filter" ? "" : selectedOption);
      setData(res.data.data);
    };

    getData();
  }, [selectedOption]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await apiUser.monthOptions();
      setMonthOptions(data.data);
    };

    getData();
  }, []);

  const handleDownload = () => {
    const rows = data.map((v, i) => {
      return {
        No: i + 1,
        Unit: v.unit,
        Siswa: v.nama_siswa,
        Nominal: v.nominal,
        Tanggal: convertDate(v.created_at),
      };
    });

    excelDownloader(rows, "Pemasukan.xlsx");
  };

  return (
    <Layout>
      <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
          <h3 class="fw-bold ">Pemasukan</h3>
          <div class="card">
            <div class="card-body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Dropdown onSelect={handleSelect}>
                  <Dropdown.Toggle variant="primary" id="dropdown-select">
                    {selectedOption}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {monthsOptions.map((v) => (
                      <Dropdown.Item eventKey={v.month_year}>
                        {v.month_year}
                      </Dropdown.Item>
                    ))}{" "}
                    <Dropdown.Item eventKey="Filter">Semua</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="success" onClick={handleDownload}>
                  Export
                </Button>
              </div>

              <div
                class="table-responsive text-nowrap"
                style={{ marginTop: 12 }}
              >
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Unit</th>
                      <th>Siswa</th>
                      <th>Nominal</th>
                      <th>Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((row, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{row.unit}</td>
                        <td>{row.nama_siswa}</td>
                        <td>{rupiahFormatter(row.nominal)}</td>
                        <td>{convertDate(row.created_at)}</td>
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

export default Pemasukan;
