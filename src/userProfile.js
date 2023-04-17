import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import "../src/assests/styles/userProfile.css";
import axios from "axios";
import images from "./assests/images";

import NavFuckingbar from "./nav";

function UserProfile() {
  let id = localStorage.getItem("idusuario");
  let [data, setdata] = useState([]);
  let [urlperfil, seturlperfil] = useState("");
  let [username, setusername] = useState("");
  let [correo, setcorreo] = useState("");
  let [sanciones, setsanciones] = useState();
  let [fechaRegistro, setfechaRegistro] = useState("");
  let [contribuciones, setContribuciones] = useState();
  console.log("ID DE USUARIO: ", id);
  
  useEffect(() => {
    axios
      .get(`https://backend-production-6d58.up.railway.app/api/users/${id}`)
      .then((res) => {
        let arr = res.data;
        setusername(arr.username);
        setcorreo(arr.correo);
        setsanciones(arr.strikes);
        seturlperfil(arr.imagenperfil);
        setfechaRegistro(arr.fecharegistro);
      })
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    axios
      .get(`https://backend-production-6d58.up.railway.app/api/contribucion/getUserContrib/${id}`)
      .then((res) => {
        setContribuciones(res.data.length);
      })
      .catch((err) => console.log(err));
    console.log(data);
  });

  const handleButtonClick = () => {
    console.log("Botón de generar PDF pulsado");
  }

  return (
    <>
      <NavFuckingbar />
      <Container className="mt-3 user-profile ">
        <Row>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img
              src={images.profile}
              alt="Imagen de perfil"
              className="rounded-circle img-thumbnail"
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Row>
              <Col className="text-center">
                <h3 className="nameuser">{username}</h3>
                <p className="correo">{correo}</p>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <ListGroup bordered>
                  <ListGroup.Item style={{ borderBottom: "2px solid #dee2e6" }}>
                    <Row>
                      <Col md={6} lg={6}>
                        <h5>Fecha de registro:</h5>
                      </Col>
                      <Col md={6} lg={6}>
                        <p>{fechaRegistro}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item style={{ borderBottom: "2px solid #dee2e6" }}>
                    <Row>
                      <Col md={6} lg={6}>
                        <h5>Contribuciones:</h5>
                      </Col>
                      <Col md={6} lg={6}>
                        <p>{contribuciones}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={6} lg={6}>
                        <h5>Sanciones:</h5>
                      </Col>
                      <Col md={6} lg={6}>
                        <p>{sanciones}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
              <button style={{padding: '10px 20px', margin: '20px 0'}} onClick={() => {
                const { jsPDF } = require("jspdf");
                require("jspdf-autotable");
                async function contribuciones() {
                  const doc = new jsPDF();
                  const datos = await axios.get(`https://backend-production-6d58.up.railway.app/api/contribucion/getUserContrib/${id}`);
                  const data = datos.data;
                  // Definir el contenido del JSON
                  /*    var data = [
                    { id: 1, name: "John Doe", email: "johndoe@example.com" },
                    { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
                    { id: 3, name: "Bob Johnson", email: "bobjohnson@example.com" },
                  ];
               */
                  // Definir las columnas de la tabla
                  var columns = [
                    "ID Contribución",
                    "ID Juego",
                    "Calificación",
                    "Fecha",
                  ];
            
                  // Definir la posición inicial de la tabla
                  var startX = 10;
                  var startY = 10;
            
                  // Definir el ancho de cada columna
                  var columnWidths = [30, 30, 30, 30, 40];
            
                  // Definir el tamaño de la fuente
                  var fontSize = 12;
            
                  // Definir el tamaño de la tabla
                  var pageWidth = doc.internal.pageSize.width;
                  var pageHeight = doc.internal.pageSize.height;
                  var tableWidth = columnWidths.reduce((acc, cur) => acc + cur);
                  var tableHeight = (data.length + 1) * fontSize * 1.2;
                  var x = (pageWidth - tableWidth) / 2;
                  var y = (pageHeight - tableHeight) / 2;
            
                  // Crear la tabla
                  doc.setFontSize(fontSize);
                  doc.text("Lista de contribuciones", x, startY);
                  doc.autoTable({
                    startY: y + fontSize * 1.5,
                    head: [columns],
                    body: data.map((obj) => [
                      obj.idcontr,
                      obj.idJuego,
                      obj.calif,
                      obj.fechacontr,
                    ]),
                    startY: y,
                    theme: "grid",
                    columnStyles: {
                      0: { cellWidth: columnWidths[0] },
                      1: { cellWidth: columnWidths[1] },
                      2: { cellWidth: columnWidths[2] },
                      3: { cellWidth: columnWidths[3] },
                    },
                    didDrawPage: function (data) {
                      tableHeight = doc.autoTableEndPosY() + 10;
                    },
                    autoSize: {
                      theme: "grid",
                      tableWidth: "wrap",
                      cellPadding: 1,
                      fontSize: fontSize,
                      minCellWidth: 10,
                      minCellHeight: 4,
                    },
                  });
            
                  // Guardar el PDF
                  doc.save("lista_Contribuciones.pdf");
                }
                contribuciones()
              }}>Ver contribuciones</button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default UserProfile;
