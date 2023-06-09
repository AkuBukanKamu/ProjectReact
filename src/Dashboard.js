import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Nav from "./Components/Nav";
import Sidebar from './Components/Sidebar';
import SidebarUser from './Components/Sidebar';

function Dashboard() {

  const [user, setUser] = useState({});

  const history = useHistory();

  const token = localStorage.getItem("token");

  const fetchData = async () => {

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      await axios.get('http://127.0.0.1:8000/api/datauser')
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
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
        
                <Sidebar />
        
            
            <div class="layout-page">
                <Nav />

                <div class="content-wrapper">
                    <div class="container-xxl flex-grow-1 container-p-y">
                        <h3 class="fw-bold py-3 mb-4">Dashboard</h3>
                        <div class="card">
                            <div class="card-body">
                                <h4><center><strong>Selamat Datang</strong></center></h4>
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
  
export default Dashboard;