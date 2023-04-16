import NavFuckingbar from "./nav";
import JuegosVistaPrevia from "./components/JuegosVistaPrevia";
import React, { Component } from "react";
import "./assests/styles/navbar.css";
import "./assests/styles/gameflex.css";
import "./assests/styles/registro.css";

function Biblioteca() {
  return (
    <div id="contenido">
      <NavFuckingbar />
      <div style={{ marginTop: 30 }}>
        <div>
          <JuegosVistaPrevia />
        </div>
      </div>
    </div>
  );
}
export default Biblioteca;
