import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap/";
import apiUser from "../lib/api/admin/user";
import Layout from "../Components/Layout";
import { useForm } from "react-hook-form";
import TextField from "../Components/FormInput/TextField";
import SelectForm from "../Components/FormInput/SelectForm";

const unitOptions = [
  { value: "Magersari", label: "Magersari" },
  { value: "Kenongo", label: "Kenongo" },
  { value: "Surodinawan", label: "Surodinawan" },
];

function CreateGuru() {
  const history = useHistory();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [validationError, setValidationError] = useState({});
  const level = watch("level");

  const onSubmit = async (data) => {
    data.level = "user";
    await apiUser
      .store(data)
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
    <Layout>
      <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
          <h4 class="fw-bold py-3 mb-4">Membuat Akun Guru</h4>
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
                        name="name"
                        label="Nama Lengkap"
                        placeholder="Masukkan Nama Lengkap"
                        control={control}
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <TextField
                        name="email"
                        label="Email"
                        placeholder="Masukkan Email"
                        control={control}
                        required
                        type="email"
                      />
                    </div>

                    <div class="mb-3">
                      <TextField
                        name="password"
                        label="Password"
                        placeholder="Masukkan Password"
                        control={control}
                        required
                        type="password"
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
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <TextField
                        name="gaji"
                        label="Gaji"
                        placeholder="Masukkan Gaji"
                        control={control}
                        required
                        prefix="Rp."
                      />
                    </div>

                    <div class="mb-3">
                      <TextField
                        name="tanggal_masuk"
                        label="Tanggal Masuk"
                        control={control}
                        required
                        type="date"
                      />
                    </div>
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
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div class="content-backdrop fade"></div>
      </div>
      <div class="layout-overlay layout-menu-toggle"></div>
    </Layout>
  );
}

export default CreateGuru;
