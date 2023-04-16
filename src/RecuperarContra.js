import NavFuckingbar from "./nav";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";

const RecuperarContrasena = () => {
  const [email, setEmail] = useState("");

  var password;

  const navigate = useNavigate();

  function Emailsender() {
    emailjs.init("hQiGy33WLjt9KtwHm");
  }

  function VerificarBloqueo() {
    let CorreosBloqueados = [];
    CorreosBloqueados = localStorage.getItem("correosbloqueados");
    console.log(
      "Hola que hace, estos son los correos bloqueados" + CorreosBloqueados
    );
  }

  Emailsender();

  const EnviarCorreo = async () => {
    const res = await axios.get(
      "https://backend-production-6d58.up.railway.app/api/users/getAllUsers",
      {
        responseType: "json",
      }
    );
    const match = res["data"].find((element) => {
      return element.correo === email;
    });
    if (match) {
      var contra = "No hay";
      contra = match.password;
      password = contra;
      console.log("La contraseña es: ", contra);
      return true;
    } else {
      return false;
    }
  };

  const alSubmit = async (ev) => {
    ev.preventDefault();
    let result = await EnviarCorreo();
    if (result) {
      console.log("El correo existe");
      emailjs
        .sendForm(
          "service_4xwxc6u",
          "template_qnece24",
          ev.target,
          "hQiGy33WLjt9KtwHm"
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );
      alert("Revise su correo");
      navigate("/");
    } else {
      console.log("El correo no existe");
      alert("Hubo un error al enviar correo o el correo no existe");
      ev.preventDefault();
    }
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(rgb(37, 3, 3), rgb(231, 24, 24))",
      }}
      className="container-fluid overflow-hidden"
    >
      <NavFuckingbar />
      <div className="row my-3">
        <div
          style={{ boxShadow: "4px 4px 26px -2px rgba(0,0,0,0.68)" }}
          className="col-md-8 mx-auto bg-light p-4"
        >
          <h2 className="text-center">Recuperar Contraseña</h2>
          <p className="text-center">
            Estimado usuario, escriba su correo electronico para enviar un
            correo con su contraseña.
          </p>
          <form onSubmit={alSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label" for="emailRecuperar">
                Email a recuperar
              </label>
              <input
                type="email"
                id="emailRecuperar"
                name="email"
                className="form-control p-3"
                onChange={(ev) => setEmail(ev.target.value)}
                value={email}
                placeholder="Correo Electronico"
                required
              />
              <input type="hidden" name="contra" id="contra" value={password} />
            </div>
            <button
              className="btn btn-primary btn-info btn-block text-center mx-auto"
              type="submit"
            >
              Enviar Correo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecuperarContrasena;
