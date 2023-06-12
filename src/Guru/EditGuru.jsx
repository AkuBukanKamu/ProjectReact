import React, { useEffect, useMemo, useState } from "react";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import TextField from "../Components/FormInput/TextField";
import SelectForm from "../Components/FormInput/SelectForm";
import { useForm } from "react-hook-form";
import { apiTeacher } from "../lib/api/admin/teacher";

const unitOptions = [
  { value: "Magersari", label: "Magersari" },
  { value: "Kenongo", label: "Kenongo" },
  { value: "Surodinawan", label: "Surodinawan" },
];

function EditGuru() {
  const history = useHistory();

  const { id } = useParams();
  const [initialBody, setInitialBody] = useState();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return initialBody;
    }, [initialBody]),
  });

  const [unit, setUnit] = useState("");
  const [nama, setNama] = useState("");
  const [tempatlahir, setTempatlahir] = useState("");
  const [tanggallahir, setTanggallahir] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [gaji, setGaji] = useState("");
  const [tanggalmasuk, setTanggalmasuk] = useState("");
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    const getData = async () => {
      await apiTeacher.view(id).then(({ data }) => {
        console.log(data)
        setInitialBody(data.data);
        reset(data.data);
      });
    };
    getData();
  }, []);

  const onSubmit = async (data) => {
    await apiTeacher
      .update(id, data)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });

        history.push("/guru");
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
  const updateGuru = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("unit", unit);
    formData.append("nama", nama);
    formData.append("tempatlahir", tempatlahir);
    formData.append("tanggallahir", tanggallahir);
    formData.append("no_hp", no_hp);
    formData.append("gaji", gaji);
    formData.append("tanggalmasuk", tanggalmasuk);

    await axios
      .post(`http://127.0.0.1:8000/api/guru/update/${id}`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        history.push("/guru");
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
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        <Sidebar />

        <div class="layout-page">
          <Nav />

          <div class="content-wrapper">
            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4">Edit Data Guru</h4>
              <div class="row">
                <div class="col-xl">
                  <div class="card mb-12">
                    {Object.keys(validationError).length > 0 && (
                      <div className="row">
                        <div className="col-12">
                          <div className="alert alert-danger">
                            <ul className="mb-0">
                              {Object.entries(validationError).map(
                                ([key, value]) => (
                                  <li key={key}>{value}</li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <div class="card-body">
                        <div>Lengkapi Data Guru</div>
                        <div class="mb-3">
                          <TextField
                            name="nama"
                            label="Nama Lengkap"
                            placeholder="Masukkan Nama Lengkap"
                            control={control}
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <SelectForm
                            name="unit"
                            label="Unit"
                            control={control}
                            options={unitOptions}
                            required
                          />
                        </div>

                        <div class="mb-3">
                          <TextField
                            name="tempat_lahir"
                            label="Tempat Lahir"
                            placeholder="Masukkan Tempat Lahir"
                            control={control}
                            required
                          />
                        </div>

                        <div class="mb-3">
                          <TextField
                            name="tanggal_lahir"
                            label="Tanggal Lahir"
                            placeholder="Masukkan Tanggal Lahir"
                            control={control}
                            required
                            type="date"
                          />
                        </div>

                        <div class="mb-3">
                          <TextField
                            name="no_hp"
                            label="No Handphone"
                            placeholder="Masukkan No HP"
                            control={control}
                          />
                        </div>

                        <div class="mb-3">
                          <TextField
                            name="gaji"
                            label="Gaji"
                            placeholder="Masukkan Gaji"
                            control={control}
                            prefix="Rp."
                          />
                        </div>

                        <div class="mb-3">
                          <TextField
                            name="tanggal_masuk"
                            label="Tanggal Masuk"
                            control={control}
                            type="date"
                          />
                        </div>

                        <div class="card-footer">
                          <Button className="btn btn-primary" type="submit">
                            <i className="bx bx-save"></i> Save Changes
                          </Button>{" "}
                          &nbsp;&nbsp;
                          <Link className="btn btn-danger" to={"/users"}>
                            <i className="bx bx-undo"></i> Cancel
                          </Link>
                        </div>
                      </div>
                    </Form>
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

export default EditGuru;
