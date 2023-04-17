import React, { useState } from "react";

import Navbar from "./nav";
import Contribuciones from "./comActividad/Contribuciones";
import Nav from "react-bootstrap/Nav";

import "../src/assests/styles/registroActividad.css";
import "./assests/styles/gameflex.css";

function RegistroActividad() {
  const [activeTab, setActiveTab] = useState("contribuciones");

  return (
    <div>
      <Navbar />
      <div className="container fondo">
          <Contribuciones />
      </div>
    </div>
  );
}

export default RegistroActividad;



/* 
export default class registroActividad extends Component {
  
  render() {
    return (
      <div>
        <Navbar />
        <div className='container' id='activitySearch'>
        <Form size="sm">
          <Form.Group controlId="exampleForm.SelectCustom">
           <Form.Label>Custom select</Form.Label>
            <Form.Control  as="select" custom>
              <option>Comentarios</option>
              <option>Puntaciones</option>
              <option>Sanciones</option>
            </Form.Control>
          </Form.Group>
        </Form>
        </div>
        <section className='container fondo' id='registro-actividad'>
          <div class='contenido'>
            <div class='img-perfil'>

            </div>
            <div class='texto-fecha'>
                <p>2/3/2023</p>
            </div>
            <div class='texto-actividad'>
                <p>Juan ha <b>comentado</b> el juego Mario Party </p>
            </div>
            <div class='texto-comentario'>
              <p>Juegazo!!!</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
 */
