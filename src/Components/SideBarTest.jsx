import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import apiUser from "../lib/api/admin/user";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import {Nav} from "react-bootstrap";

const Sidebar = () => {
  const history = useHistory();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchData = async () => {
    try {
      await apiUser.user();
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      history.push("/");
    }
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
   
    <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
    activeKey="/home"
    onSelect={selectedKey => alert(`selected ${selectedKey}`)}
    >
        <div className="sidebar-sticky"></div>
    <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
        Disabled
        </Nav.Link>
    </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
