import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import { apiTeacher } from "../../lib/api/admin/teacher";
import Chart from "react-apexcharts";
import apiUser from "../../lib/api/admin/user";
import { Card } from "react-bootstrap";
import { useScreenSize } from "../../lib/utils/useScreenSize";

function Dashboard() {
  const [data, setData] = useState();
  const [greeting, setGreeting] = useState("");
  const [month, setMonth] = useState([]);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const role = localStorage.getItem("role")
  const [unit, setUnit] = useState()
  const {deviceType} = useScreenSize()

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
      const res = await apiUser.chart();
      const data = res.data.data;

      const mo = data.income.map((v) => {
        return v.month;
      });
      setMonth(mo);

      const inc = data.income.map((v) => {
        return v.nominal;
      });
      setIncome(inc);

      const exp = data.expense.map((v) => {
        return v.nominal;
      });
      setExpense(exp);

      setData(res.data.data);


      const res1 = await apiTeacher.dashboard();
      setUnit(res1?.data?.data?.info?.unit)
    };

    getData();
  }, []);

  const diagram = {
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: month,
      },
      colors: ["#00ff00", "#d62d20"],
    },
    series: [
      {
        name: "Pemasukan",
        data: income,
      },
      {
        name: "Pengeluaran",
        data: expense,
      },
    ],
  };

  const student = {
    series: [
      data?.student?.Kenongo,
      data?.student?.Magersari,
      data?.student?.Surodinawan,
    ],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Kenongo", "Magersari", "Surodinawan"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  const teacher = {
    series: [
      data?.teacher?.Kenongo,
      data?.teacher?.Magersari,
      data?.teacher?.Surodinawan,
    ],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Kenongo", "Magersari", "Surodinawan"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <Layout>
      {" "}
      <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
          <Card style={{ padding: 16, width: "100%", marginBottom: 24 }}>
            <h1 style={{ textAlign: "center", fontSize: 20 }}>
              Laporan Keuangan {role === "user" && `Unit ${unit}`}
            </h1>
            <Chart
              options={diagram.options}
              series={diagram.series}
              type="line"
              width="100%"
              height={480}
            />
          </Card>
          <div style={{ marginTop: 16, display: "flex", gap: 24 }}>
            <Card style={{ padding: 16, width: "100%" }}>
              <h1 style={{ textAlign: "center", fontSize: 20 }}>
                Jumlah Siswa
              </h1>
              <div id="chart">
                <Chart
                  options={student.options}
                  series={student.series}
                  type="pie"
                  width={380}
                />
              </div>
            </Card>
            <Card style={{ padding: 16, width: "100%" }}>
              <h1 style={{ textAlign: "center", fontSize: 20 }}>Jumlah Guru</h1>
              <div id="chart">
                <Chart
                  options={teacher.options}
                  series={teacher.series}
                  type="pie"
                  width={380}
                />
              </div>
            </Card>
          </div>

          <div class="content-backdrop fade"></div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
