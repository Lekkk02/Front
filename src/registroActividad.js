import React, { useState } from "react";

import Navbar from "./nav";
import Contribuciones from "./comActividad/Contribuciones";
import Sanciones from "./comActividad/Sanciones";
import Baneos from "./comActividad/Baneos";
import GestionMultimedia from "./comActividad/Multimedia";
import {contribuciones,sanciones,baneos,gestionMultimedia} from "./comActividad/datos";
import Nav from "react-bootstrap/Nav";
import "../src/assests/styles/registroActividad.css";

function RegistroActividad() {
  const [activeTab, setActiveTab] = useState("contribuciones");

  return (
    <div>
      <Navbar />
      <div className="container tabla">
        <Nav className="nav"
          variant="tabs"
          activeKey={activeTab}
          onSelect={(selectedKey) => setActiveTab(selectedKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="contribuciones">Contribuciones</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="sanciones">Sanciones</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="baneos">Baneos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="gestionMultimedia">Gestión Multimedia</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      <div className="container fondo">
        {activeTab === "contribuciones" && (
          <Contribuciones contribuciones={contribuciones} />
        )}
        {activeTab === "sanciones" && <Sanciones sanciones={sanciones} />}
        {activeTab === "baneos" && <Baneos baneos={baneos} />}
        {activeTab === "gestionMultimedia" && (
          <GestionMultimedia gestionMultimedia={gestionMultimedia} />
        )}
        {activeTab !== "comentarios" &&
          activeTab !== "sanciones" &&
          activeTab !== "baneos" &&
          activeTab !== "gestionMultimedia" && 
          <p></p>}
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
