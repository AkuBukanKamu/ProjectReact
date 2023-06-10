import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

import Sidebar from "../Components/Sidebar";
import Nav from "../Components/Nav";
import apiUser from "../lib/api/admin/user";

function ListUser() {
  const [data, setData] = useState([]);
  const [reloadTable, setReloadTable] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await apiUser.index();
      setData(res.data);
    };

    getData();
  }, [reloadTable]);

  const deleteUser = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }
    await apiUser
      .deleted(id)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        setReloadTable(!reloadTable)
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  return (
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        <Sidebar />

        <div class="layout-page">
          <Nav />

          <div class="content-wrapper">
            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4">Data User</h4>
              <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="mb-0">Data User</h5>
                  <Link
                    to={"/user/create"}
                    class="btn btn-sm btn-primary float-end"
                  >
                    <i class="bx bx-plus"></i> Tambah Data
                  </Link>
                </div>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Nama User</th>
                          <th>Email</th>
                          <th>Level</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((row, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.level}</td>
                            <td>
                              <Link
                                to={`/user/edit/${row.id}`}
                                className="btn btn-sm btn-primary"
                              >
                                <i class="bx bx-edit"></i> Edit
                              </Link>{" "}
                              &nbsp;
                              <Button
                                onClick={() => deleteUser(row.id)}
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
        </div>
      </div>
      <div class="layout-overlay layout-menu-toggle"></div>
    </div>
  );
}

export default ListUser;
