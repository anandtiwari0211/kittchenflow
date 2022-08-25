import React, { useEffect, useState, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Dashboard from './pages/Dashboard';
import Admin from "./pages/Admin";

import AuthProvider from "./pages/AuthContext";

const Markup = () => {

  const [auth, setAuth] = useState({});
  function checkLoggedIn(){
    let jwt = localStorage.getItem('KF_USER');
    if(jwt !== "") setAuth({jwt})
  }

  useEffect(()=>checkLoggedIn(), [])
  return (
    <>
    <AuthProvider value={
      {...auth }  
      }>
    <Switch>

      <Route path="/" exact component={Otp} />
      <Route path="/login" exact component={Login} />
      {localStorage.getItem('KF_USER') === 'Admin' ? <Route path="/dashboard" exact component={Dashboard} /> : '' }
      <Route path="/admin" exact component={Admin} />
    </Switch>
    </AuthProvider>
    </>
  );
};

export default Markup;
