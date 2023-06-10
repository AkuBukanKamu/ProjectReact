import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

function Sidebar() {
  const [user, setUser] = useState({});

  const history = useHistory();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://127.0.0.1:8000/api/datauser").then((response) => {
      setUser(response.data);
    });
  };

  useEffect(() => {
    if (!token) {
      history.push("/");
    }

    fetchData();
  }, []);

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    Swal.fire({
      icon: "success",
      text: "Berhasil Logout",
    });
    history.push("/");
  };

  return (
    <aside
      id="layout-menu"
      class="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div class="app-brand demo">
        <Link to={"#"} class="app-brand-link">
          <span class="app-brand-logo demo"></span>
          <span class="app-brand-text demo menu-text fw-bolder ms-2">
            AIUEO
          </span>
        </Link>
      </div>

      <div class="menu-inner-shadow"></div>

      <ul class="menu-inner py-1">
        <li class="menu-item">
          <Link to={"/dashboard"} class="menu-link">
            <i class="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Analytics">Dashboard</div>
          </Link>
        </li>

        <li class="menu-header small text-uppercase">
          <span class="menu-header-text">Menu</span>
        </li>
        {role === "admin" && (
          <>
            <li class="menu-item">
              <Link to={"/users"} class="menu-link">
                <i class="menu-icon tf-icons bx bx-user-circle"></i>
                <div data-i18n="Analytics">Data User</div>
              </Link>
            </li>

            <li class="menu-item">
              <Link to={"/murid"} class="menu-link">
                <i class="menu-icon tf-icons bx bx-user"></i>
                <div data-i18n="Analytics">Data Murid</div>
              </Link>
            </li>

            <li class="menu-item">
              <Link to={"/guru"} class="menu-link">
                <i class="menu-icon tf-icons bx bx-briefcase"></i>
                <div data-i18n="Analytics">Data Guru</div>
              </Link>
            </li>
          </>
        )}

        <li class="menu-item">
          <Link to={"/#"} class="menu-link">
            <i class="menu-icon tf-icons bx bx-briefcase"></i>
            <div data-i18n="Analytics">Pembayaran SPP</div>
          </Link>
        </li>

        <li class="menu-item">
          <Link to={"/#"} class="menu-link">
            <i class="menu-icon tf-icons bx bx-briefcase"></i>
            <div data-i18n="Analytics">Pemasukan Dan Pengeluaran</div>
          </Link>
        </li>

        <li class="menu-item">
          <Link onClick={logoutHandler} class="menu-link">
            <i class="menu-icon tf-icons bx bx-log-in-circle"></i>
            <div data-i18n="Analytics">Logout</div>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
