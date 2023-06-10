import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';
import { error } from 'jquery';

function Login()    {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [validation, setValidation] = useState([]);

    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            history.push('/dashboard');
        }
    }, []);

    const loginHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        await axios.post(`http://127.0.0.1:8000/api/login`, formData)
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.datauser.level);

            history.push('/dashboard')
        })
        .catch((error) => {
            setValidation(error.response.data);
        })
    };




    return (
        <section class="vh-100" >
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong">
          <div class="card-body p-5 text-center">

            <h3 class="mb-5">Masuk</h3>

            {
                validation.message && (
                    <div className="alert-alert-danger">
                        {validation.message}
                    </div>
                )
            }
            <form onSubmit={loginHandler}>
            <div class="form-outline mb-4">
              <input type="email" id="typeEmailX-2" class="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label class="form-label" for="typeEmailX-2">Email</label>
            </div>

            <div class="form-outline mb-4">
              <input type="password" id="typePasswordX-2" class="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label class="form-label" for="typePasswordX-2">Password</label>
            </div>
           

            <button class="btn btn-primary btn-lg btn-block" type="submit">Login</button>
            </form>
            <hr class="my-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    );
}

export default Login;