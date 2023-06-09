import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";


import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";

function EditGuru() {

    const history = useHistory();

    const { id } = useParams()
    
    const [unit, setUnit] = useState("")
    const [nama, setNama] = useState("")
    const [tempatlahir, setTempatlahir] = useState("")
    const [tanggallahir, setTanggallahir] = useState("")
    const [no_hp, setNo_hp] = useState("")
    const [gaji, setGaji] = useState("")
    const [tanggalmasuk, setTanggalmasuk] = useState("")
    const [validationError,setValidationError] = useState ({})
  
    useEffect(()=>{
        fetchDataGuru()
    },[])

    const fetchDataGuru = async () => {
        await axios.get(`http://127.0.0.1:8000/api/guru/show/${id}`).then(({data})=>{
        const { nama, tempatlahir,tanggallahir, no_hp, gaji } = data.guru
            setNama(nama)
            setTempatlahir(tempatlahir)
            setTanggallahir(tanggallahir)
            setNo_hp(no_hp)
            setGaji(gaji)
            setTanggalmasuk(tanggalmasuk)
        }).catch(({response:{data}})=>{
        Swal.fire({
            text:data.message,
            icon:"error"
        })
        })
    }

    const updateGuru = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH');
        formData.append('unit', unit)
        formData.append('nama', nama)
        formData.append('tempatlahir', tempatlahir)
        formData.append('tanggallahir', tanggallahir)
        formData.append('no_hp', no_hp)
        formData.append('gaji', gaji)
        formData.append('tanggalmasuk', tanggalmasuk)

        await axios.post(`http://127.0.0.1:8000/api/guru/update/${id}`, formData).then(({data})=>{
        Swal.fire({
            icon:"success",
            text:data.message
        })
        history.push('/guru');
        }).catch(({response})=>{
        if(response.status===422){
            setValidationError(response.data.errors)
        }else{
            Swal.fire({
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
                        <h4 class="fw-bold py-3 mb-4">Edit Data Guru</h4>
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
                                    <Form onSubmit={updateGuru}>
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
                                          <Form.Control type="text" placeholder="Nama Lengkap ..." required value={nama} onChange={(event)=>{setNama(event.target.value)}}/>
                                      </div>

                                      <div class="mb-3">
                                          <Form.Label>Tempat Lahir</Form.Label>
                                          <Form.Control type="text" placeholder="Tempat Lahir ..." required value={tempatlahir} onChange={(event)=>{setTempatlahir(event.target.value)}}/>
                                      </div>

                                      <div class="mb-3">
                                          <Form.Label>Tanggal Lahir</Form.Label>
                                          <Form.Control type="date" placeholder="Tanggal Lahir ..." required value={tanggallahir} onChange={(event)=>{setTanggallahir(event.target.value)}}/>
                                      </div>

                                      <div class="mb-3">
                                          <Form.Label>No Handphone</Form.Label>
                                          <Form.Control type="number" placeholder="No Handphone ..." required value={no_hp} onChange={(event)=>{setNo_hp(event.target.value)}}/>
                                      </div>

                                      <div class="mb-3">
                                            <Form.Label>Gaji</Form.Label>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text>Rp</InputGroup.Text>
                                                <Form.Control type="number" placeholder="Gaji ..." required value={gaji} onChange={(event)=>{setGaji(event.target.value)}} />
                                            </InputGroup>
                                      </div>

                                      <div class="mb-3">
                                          <Form.Label>Tanggal Masuk</Form.Label>
                                          <Form.Control type="date" placeholder="Tanggal Masuk" required value={tanggalmasuk} onChange={(event)=>{setNo_hp(event.target.value)}}/>
                                      </div>

                                        </div>
                                      <div class="card-footer">
                                        <Button className="btn btn-primary" type="submit"><i className="bx bx-save"></i> Save Changes</Button> &nbsp;&nbsp;
                                        <Link className="btn btn-danger" to={"/listcustomer"}><i className="bx bx-undo"></i> Cancel</Link>
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

export default EditGuru;