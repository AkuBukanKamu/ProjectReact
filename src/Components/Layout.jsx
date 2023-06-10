import React from "react";
import Sidebar from "./Sidebar";
import { Nav } from "react-bootstrap";

function Layout({children}) {
  return (
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        <Sidebar />

        <div class="layout-page">
          <Nav />
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
