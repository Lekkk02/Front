import NavFuckingbar from "../nav";
import React, { Component } from "react";
import "../assests/styles/navbar.css";
import "../assests/styles/gameflex.css";
import "../assests/styles/registro.css";
import JuegosVistaCompletaINFO from "./JuegosVistaCompletaINFO";

function JuegoVistaCompleta() {
  return (
    <div id="contenido">
      <NavFuckingbar />
      <div>
        <JuegosVistaCompletaINFO />
      </div>
    </div>
  );
}

export default JuegoVistaCompleta;
