import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Nav() {
  const [user, setUser] = useState({});

  const history = useHistory();

  const token = localStorage.getItem("token");

  const fetchData = async () => {

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      await axios.get('http://127.0.0.1:8000/api/user')
      .then((response) => {

          setUser(response.data);
      })
  }

  useEffect(() => {

      if(!token) {

          history.push('/');
      }
      
      fetchData();
  }, []);

return (
  
  <nav
      class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
  >
      <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          
      </div>

      <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
          <ul class="navbar-nav flex-row align-items-center ms-auto">
              <i class="menu-icon tf-icons bx bx-user-circle"></i> {user.name}
          </ul>
      </div>
  </nav>

  )

}


export default Nav;