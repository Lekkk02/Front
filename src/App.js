//import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import "../src/assests/styles/navbar.css";
import "../src/assests/styles/gameflex.css";
import "../src/assests/styles/registro.css";
import "../src/assests/styles/busquedaA.css";
import "../src/assests/styles/registroActividad.css";
import "../src/assests/styles/userProfile.css";

import Home from "./principal";
import Biblioteca from "./Biblioteca";
import Registro from "./resgistro";
import Modal from "./modal";
import Actividad from "./registroActividad";
import JuegoVistaCompleta from "./components/JuegosVistaCompleta";
import testeo from "./components/JuegosVistaPrevia";
import Busqueda from "./Busqueda";
import RecuperarContrasena from "./RecuperarContra";
import UserProfile from "./userProfile";

//Componentes de Admin
import InsertGame from "./insertGame";
import PrincipalAdmin from "./principalAdmin";
import OptionAdmin from "./opcionesAdmin";
import PrivateRoute from "./AdminRoute";
import DeleteGame from "./eliminarJuego";
import BanUser from "./banUser";
import SanUser from "./sansionarUser";
import GenerarReporte from "./generarReporte";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Modal />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Biblioteca" element={<Biblioteca />} />
          <Route path="/registro" Component={Registro} />
          <Route path='/Recuperacion' Component={RecuperarContrasena} />
          <Route
            path="/insertGame"
            element={
              <PrivateRoute>
                <InsertGame />
              </PrivateRoute>
            }
          />
          <Route
            path="/deleteGame"
            element={
              <PrivateRoute>
                <DeleteGame />
              </PrivateRoute>
            }
          />
          <Route path="/adminStart" Component={PrincipalAdmin} />
          <Route
            path="/adminOption"
            element={
              <PrivateRoute>
                <OptionAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/banUser"
            element={
              <PrivateRoute>
                <BanUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/SanUser"
            element={
              <PrivateRoute>
                <SanUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/registroActividad"
            element={
              <PrivateRoute>
                <Actividad />
              </PrivateRoute>
            }
          />
          <Route 
            path="/generarReporte"  
            element={
              <PrivateRoute>
                <GenerarReporte />
              </PrivateRoute>
            }
          />
          ///RUTAS JUEGOS
          <Route path="/game/:id" Component={JuegoVistaCompleta} />
          <Route path="/testeo" Component={testeo} />
          //RUTAS BUSQUEDA
          <Route path="/Busqueda/:Resultado" Component={Busqueda} />
          <Route path="/Busqueda" Component={Busqueda} />
          ///RUTA PERFIL USUARIO
          <Route path="/userProfile" Component={UserProfile} />
        </Routes>
      </BrowserRouter>
    );
  }
}
