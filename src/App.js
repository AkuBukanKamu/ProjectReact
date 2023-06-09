import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './login';

import ListUser from './Components/User/ListUser';
import CreateUser from './Components/User/CreateUser';
import EditUser from './Components/User/EditUser';

import DataGuru from './Guru/DataGuru';
import CreateGuru from './Guru/CreateGuru';
import EditGuru from './Guru/EditGuru';

import DataMurid from './Murid/DataMurid';
import CreateMurid from './Murid/CreateMurid';
import EditMurid from './Murid/EditMurid'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />

      <Route exact path="/listuser" component={ListUser} />
      <Route exact path="/user/create" component={CreateUser} />
      <Route exact path="/user/edit/:id" component={EditUser} />
      
      <Route exact path="/guru" component={DataGuru} />
      <Route exact path="/guru/create" component={CreateGuru} />
      <Route exact path="/guru/edit/:id" component={EditGuru} />

      <Route exact path="/murid" component={DataMurid} />
      <Route exact path="/murid/create" component={CreateMurid} />
      <Route exact path="/murid/edit/:id" component={EditMurid} />

    </Switch>
  );

}

export default App;
