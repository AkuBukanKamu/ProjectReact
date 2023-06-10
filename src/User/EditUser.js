import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Sidebar from "../Components/Sidebar";
import Nav from "../Components/Nav";

function EditUser() {

    const history = useHistory();

    const { id } = useParams()
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [level, setLevel] = useState("")
    const [validationError,setValidationError] = useState({})

    useEffect(()=>{
      fetchDataUser()
    },[])

    const fetchDataUser = async () => {
      await axios.get(`http://127.0.0.1:8000/api/datauser/show/${id}`).then(({data})=>{
        const { name, email, level } = data.datauser
          setName(name)
          setEmail(email)
          setLevel(level)
      }).catch(({response:{data}})=>{
        Swal.fire({
          text:data.message,
          icon:"error"
        })
      })
    }

    const updateUser = async (e) => {
      e.preventDefault();

      const formData = new FormData()
      formData.append('_method', 'PATCH');
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('level', level)

      await axios.post(`http://127.0.0.1:8000/api/users/update/${id}`, formData).then(({data})=>{
        Swal.fire({
          icon:"success",
          text:data.message
        })
        history.push('/users');
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
                        <h4 class="fw-bold py-3 mb-4">Edit Data User</h4>
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
                                    <Form onSubmit={updateUser}>
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <Form.Label>Nama Lengkap</Form.Label>
                                            <Form.Control type="text" placeholder="Nama Lengkap ..." required value={name} onChange={(event)=>{setName(event.target.value)}}/>
                                        </div>
									
                                        <div class="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Email ..." required value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
                                        </div>

                                        <div class="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password ..." required value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
                                        </div>

                                        <div class="mb-3">
                                            <Form.Label>Level</Form.Label>
                                            <Form.Select className="form-control" required value={level} onChange={(event)=>{setLevel(event.target.value)}}>
                                                <option value="" hidden>-- Pilih Level --</option>
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <Button className="btn btn-primary" type="submit"><i className="bx bx-save"></i> Save Changes</Button> &nbsp;&nbsp;
                                        <Link className="btn btn-danger" to={"/users"}><i className="bx bx-undo"></i> Cancel</Link>
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

export default EditUser;