import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./Pages/User/Dashboard";
import Login from "./login";

import ListUser from "./Pages/Admin/User/ListUser";
import CreateUser from "./Pages/Admin/User/CreateUser";
import EditUser from "./Pages/Admin/User/EditUser";

import DataGuru from "./Pages/Admin/Guru/DataGuru";
import CreateGuru from "./Pages/Admin/Guru/CreateGuru";
import EditGuru from "./Pages/Admin/Guru/EditGuru";

import DataMurid from "./Pages/Admin/Murid/DataMurid";
import CreateMurid from "./Pages/Admin/Murid/CreateMurid";
import EditMurid from "./Pages/Admin/Murid/EditMurid";
import DaftarUlang from "./Pages/User/DaftarUlang";
import SPP from "./Pages/User/SPP";
import Profil from "./Pages/User/Profil";
import ProfilSiswa from "./Pages/User/ProfilSiswa";
import Pengeluaran from "./Pages/User/Pengeluaran";
import Pemasukan from "./Pages/User/Pemasukan";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />

      <Route exact path="/users" component={ListUser} />
      <Route exact path="/user/create" component={CreateUser} />
      <Route exact path="/user/edit/:id" component={EditUser} />

      <Route exact path="/guru" component={DataGuru} />
      <Route exact path="/guru/create" component={CreateGuru} />
      <Route exact path="/guru/edit/:id" component={EditGuru} />

      <Route exact path="/murid" component={DataMurid} />
      <Route exact path="/murid/create" component={CreateMurid} />
      <Route exact path="/murid/edit/:id" component={EditMurid} />

      <Route exact path="/daftar-ulang" component={DaftarUlang} />
      <Route exact path="/pembayaran-spp" component={SPP} />
      <Route exact path="/pemasukan" component={Pemasukan} />
      <Route exact path="/pengeluaran" component={Pengeluaran} />
      <Route exact path="/profil" component={Profil} />
      <Route exact path="/siswa/:id" component={ProfilSiswa} />
    </Switch>
  );
}

export default App;
