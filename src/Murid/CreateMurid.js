import React, {useState, useEffect} from "react";
import { Link, useHistory } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/footer";

function CreateMurid() {
    const history = useHistory();

  const [unit, setUnit] = useState("")
  const [nama, setNama] = useState("")
  const [namaguru, setNamaguru] = useState("")
  const [umur, setUmur] = useState("")
  const [nohp, setNohp] = useState("")
  const [alamat, setAlamat] = useState("")
  const [spp, setSpp] = useState("")
  const [tanggalmasuk, setTanggalmasuk] = useState("")
  const [validationError,setValidationError] = useState ({})

  const CreateMurid = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('Unit', unit)
    formData.append('nama', nama)
    formData.append('namaguru', namaguru)
    formData.append('umur', umur)
    formData.append('nohp', nohp)
    formData.append('alamat', alamat)
    formData.append('spp', spp)
    formData.append('tanggalmasuk', tanggalmasuk)

    await axios.post('http://127.0.0.1:8000/api/murid', formData).then(({data}) => {
        Swal.fire({
            icon:"success",
            text:data.message
        })

        history.push('/murid');
    }).catch(({response}) => {
        if(response.status===422) {
            setValidationError(response.data.errors)
        }else{
            Swal.fire ({
                text:response.data.message,
                icon:"error"
            })
        }
    })
}

    return (

      <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
          <Sidebar />
      
          <div class="layout-page">
              <Nav />

              <div class="content-wrapper">
                  <div class="container-xxl flex-grow-1 container-p-y">
                      <h4 class="fw-bold py-3 mb-4">Create Data Murid</h4>
                      <div class="row">
                          <div class="col-xl">
                              <div class="card mb-12">
                                  {
                                      Object.keys(validationError).length > 0 && (
                                          <div className="row">
                                              <div className="col-12">
                                                  <div className="alert alert-danger">
                                                      <ul className="mb-0">
                                                          {
                                                          Object.entries(validationError).map(([key, value])=>(
                                                              <li key={key}>{value}</li>   
                                                          ))
                                                          }
                                                      </ul>
                                                  </div>
                                              </div>
                                          </div>
                                      )
                                  }
                                  <Form onSubmit={CreateMurid}>
                                  <div class="card-body">
                                      
                                        <div class="mb-3">
                                            <Form.Label>Unit</Form.Label>
                                            <Form.Select className="form-control" required value={unit} onChange={(event)=>{setUnit(event.target.value)}}>
                                                <option value="" hidden>-- Pilih Unit --</option>
                                                <option value="magersari">Magersari</option>
                                                <option value="kenongo">Kenongo</option>
                                                <option value="surodinawan">Surodinawan</option>
                                            </Form.Select>
                                        </div>
                                      <div class="mb-3">
                                          <Form.Label>Nama Lengkap</Form.Label>
                                          <Form.Control type="string" placeholder="Nama Lengkap" required value={nama} onChange={(event)=>{setNama(event.target.value)}}/>
                                      </div>

                                      <div class="mb-3">
                                          <Form.Label>Nama Guru</Form.Label>
                                          <Form.Control type="string" placeholder="Nama Guru" required value={namaguru} onChange={(event)=>{setNamaguru(event.target.value)}}/>
                                      </div>

                                      <div class="mb-3">
                                          <Form.Label>Umur</Form.Label>
                                          <Form.Control type="number" placeholder="Umur" required value={umur} onChange={(event)=>{setUmur(event.target.value)}}/>
                                      </div>

                                      <div class="mb-3">
                                          <Form.Label>No Handphone</Form.Label>
                                          <Form.Control type="number" placeholder="Nohp ..." required value={nohp} onChange={(event)=>{setNohp(event.target.value)}}/>
                                      </div>

                                      <div class="mb-3">
                                          <Form.Label>Alamat</Form.Label>
                                          <Form.Control type="text" placeholder="Alamat" required value={alamat} onChange={(event)=>{setAlamat(event.target.value)}}/>
                                      </div>

                                      <div class="mb-3">
                                          <Form.Label>Tanggal Masuk</Form.Label>
                                          <Form.Control type="date" placeholder="Tanggal Masuk" required value={tanggalmasuk} onChange={(event)=>{setTanggalmasuk(event.target.value)}}/>
                                      </div>

                                      <div class="mb-3">
                                            <Form.Label>SPP</Form.Label>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text>Rp</InputGroup.Text>
                                                <Form.Control type="bigInteger" placeholder="SPP ..." required value={spp} onChange={(event)=>{setSpp(event.target.value)}} />
                                            </InputGroup>
                                      </div>

                                  </div>
                                  <div class="card-footer">
                                      <Button className="btn btn-primary" type="submit"><i className="bx bx-save"></i> Save Changes</Button> &nbsp;&nbsp;
                                      <Link className="btn btn-danger" to={"/murid"}><i className="bx bx-undo"></i> Cancel</Link>
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
  )

}

export default CreateMurid;