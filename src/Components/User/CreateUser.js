import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Nav from "../Nav";
import Sidebar from "../Sidebar";

function CreateUser() {

    const history = useHistory();
  
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [level, setLevel] = useState("")
    const [validationError,setValidationError] = useState({})

    const createUser = async (e) => {
        e.preventDefault();
  
        const formData = new FormData()
  
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('level', level)
  
        await axios.post(`http://127.0.0.1:8000/api/users/store`, formData).then(({data})=>{
          Swal.fire({
              icon:"success",
              text:data.message
          })
          
          history.push('/listuser');
          
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
                        <h4 class="fw-bold py-3 mb-4">Create Data User</h4>
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
                                    <Form onSubmit={createUser}>
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
                                        <Link className="btn btn-danger" to={"/listuser"}><i className="bx bx-undo"></i> Cancel</Link>
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

export default CreateUser;