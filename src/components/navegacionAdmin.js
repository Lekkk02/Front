import React, { useState, useEffect, Navigate } from "react";
import { Link, redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Props = `{
    "roleRequired":["ADMIN", "USER"]
}`;

const props = JSON.parse(Props);

const autenticacion = () => {
  let user;

  const _user = localStorage.getItem("role");

  if (_user) {
    user = _user;
  }

  if (user) {
    return user;
  } else {
    return "";
  }
};

const OpcionesNav = () => {
  const { roleRequired } = props;
  const rol = autenticacion();

  function RolisAdmin() {
    if (roleRequired[0] === rol) {
      return (
        <div>
          <li className="nav-item ">
            <Link to="/registroActividad" className="nav-link">
              Registro de Actividades
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/adminOption" className="nav-Link">
              Administrar
            </Link>
          </li>
        </div>
      );
    }
  }

  return <RolisAdmin />;
};

const IconosNav = () => {
  const { roleRequired } = props;
  const rol = autenticacion();
  function RolisAdmin() {
    var show = false;
    var closeModal = () => {
      show = false;
    };
    var openModal = () => {
      show = true;
      console.log(show);
    };
    if (roleRequired[0] === rol) {
      return (
        <div>
          <span class="material-symbols-outlined" id="user-icon">
            account_circle
          </span>
        </div>
      );
    } else if (roleRequired[1] === rol) {
      return (
        <div>
          <a href="/userProfile">
            <span class="material-symbols-outlined" id="user-icon">
              account_circle
            </span>
          </a>
          <button
            variant="primary"
            data-toggle="modal"
            data-target="#ModalCerrar"
            style={{
              padding: "0.25rem 0.5rem",
              fontSize: "0.875rem",
              lineHeight: "1.5",
              borderRadius: "0.2rem",
            }}
          >
            Cerrar sesión
          </button>
          <div className="modal" id="ModalCerrar">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Cerrar Sesión</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                  ></button>
                </div>
                <p>¿Estás seguro de cerrar la sesión?</p>
                <button
                  onClick={() => {
                    localStorage.setItem("role", "");
                    window.location.reload();
                  }}
                >
                  Sí
                </button>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <span
          className="d-inline-block"
          tabindex="0"
          data-toggle="tooltip"
          title="Iniciar Sesión"
        >
          <span
            className="material-symbols-outlined"
            id="login-icon"
            data-toggle="modal"
            data-target="#myModal"
          >
            login
          </span>
          <span
            className="d-inline-block"
            tabindex="0"
            data-toggle="tooltip"
            title="Disabled tooltip"
          ></span>
        </span>
      );
  }

  return <RolisAdmin />;
};

export { IconosNav };

export default OpcionesNav;
