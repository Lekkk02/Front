import { Component, useEffect, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import images from "./assests/images";
import axios from "axios";
import "./assests/styles/navbar.css";

function Registro() {
  const navigate = useNavigate();
  const [nickname, setnick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  let auth;
  let CheckRegg = async () => {
    const usersData = await axios.get(
      "https://backend-production-6d58.up.railway.app/api/users/getAllUsers"
    );
    let status = true;
    let match = usersData.data.forEach((element) => {
      if (element.correo.toLowerCase() === email.toLowerCase()) {
        setErrorMsg("¡El correo ingresado ya existe!");
        status = false;
        return false;
      } else if (element.username === nickname) {
        setErrorMsg("¡El nombre de usuario ingresado ya existe!");
        status = false;
        return false;
      } else if (password !== repassword) {
        setErrorMsg("¡Las contraseñas no coinciden!");
        status = false;
        return false;
      }
    });
    return status;
  };

  const alSubmit = async (ev) => {
    ev.preventDefault();

    let res = await CheckRegg();
    console.log("AUTH IS ", res);
    if (res) {
      ev.preventDefault();
      axios.post(
        "https://backend-production-6d58.up.railway.app/api/users/addUser",
        {
          username: nickname,
          password: password,
          correo: email,
        }
      );
      navigate("/", { replace: true });
      console.log("Se registró la cuenta");
    } else {
      setEmail("");
      setnick("");
      setPassword("");
      setRePassword("");
      console.log("No se pudo registrar la cuenta!");
      ev.preventDefault();
    }
  };

  /*Codigo para verificar si una contraseña posee por lo menos un número, una letra mayus, una letra minus, y un caracter especial. Fuente: Confía (sten) */
  const isStrongPassword = (p) =>
    p.search(
      /^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$)(?=.*[;:\.,!¡\?¿@#\$%\^&\-_+=\(\)\[\]\{\}])).{8,20}$/
    ) != -1;

  function ShowPassword() {
    var tipo1 = document.getElementById("password");
    var tipo2 = document.getElementById("confirm-password");
    if (tipo1.type == "password" && tipo2.type == "password") {
      tipo1.type = "text";
      tipo2.type = "text";
    } else {
      tipo1.type = "password";
      tipo2.type = "password";
    }
  }

  return (
    <div className="container-fluid" id="bg">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <Link className="pingas" to="/" id="link-index">
              <img
                style={{
                  width: "6%",
                  height: "auto",
                  marginLeft: "20px",
                  marginTop: "20px",
                }}
                src={require(`./assests/img/hogar.png`)}
                alt="..."
              />
            </Link>
            <img
              src={images.gp2}
              className="mx-auto"
              id="game_icon"
              alt="..."
            />
            <h2 className="card-title text-center" id="title">
              Registro de usuario
            </h2>
            <p>{errorMsg}</p>
            <div className="card-body py-md-4">
              <form _lpchecked="1" onSubmit={alSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control pl-2"
                    id="username"
                    placeholder="Nombre de usuario"
                    onChange={(ev) => setnick(ev.target.value)}
                    value={nickname}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control pl-2"
                    id="email"
                    placeholder="Correo"
                    onChange={(ev) => setEmail(ev.target.value)}
                    value={email}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control pl-2"
                    id="password"
                    placeholder="Contraseña"
                    minLength="8"
                    maxLength="16"
                    onChange={(ev) => setPassword(ev.target.value)}
                    value={password}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control pl-2"
                    id="confirm-password"
                    placeholder="Confirmar contraseña"
                    minLength="8"
                    maxLength="16"
                    onChange={(ev) => setRePassword(ev.target.value)}
                    value={repassword}
                    required
                  />
                </div>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <input
                    type="button"
                    name="wf"
                    className="botonMostrarPassw"
                    onClick={ShowPassword}
                    value="Mostrar Contraseña"
                  />
                </div>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  {isStrongPassword(password) &&
                  isStrongPassword(repassword) &&
                  password.length > 7 ? (
                    <button
                      style={{ marginTop: "15px" }}
                      className="btn btn-primary"
                    >
                      Crear cuenta
                    </button>
                  ) : (
                    <p style={{ padding: "10px" }}>
                      <b>
                        Asegúrate que tu contraseña cumpla los siguientes
                        requisitos:
                      </b>
                      <br /> Una letra mayúscula. <br /> Una letra minúscula.{" "}
                      <br /> Un número. <br /> Un carácter especial. <br />
                      Que posea entre 8 y 16 caractéres.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Registro;
