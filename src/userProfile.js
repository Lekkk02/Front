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
      .get(`/api/users/${id}`)
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
      .get(`/api/contribucion/getUserContrib/${id}`)
      .then((res) => {
        setContribuciones(res.data.length);
      })
      .catch((err) => console.log(err));
    console.log(data);
  });

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
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default UserProfile;
