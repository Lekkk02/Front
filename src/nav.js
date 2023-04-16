import React, { useState } from "react";
import images from "./assests/images";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import NavegacionAdmin, { IconosNav } from "./components/navegacionAdmin";

import "./assests/styles/navbar.css";
import "./assests/styles/gameflex.css";
import "./assests/styles/registro.css";

const noRole = () => {
  localStorage.setItem("role", "");
  const role = localStorage.getItem("role");
  console.log(role);
  window.location.reload();
};

const NavFuckingbar = () => {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function SearchBar() {
    console.log(busqueda);

    if (busqueda.trim() === "") {
      return alert("Rellene el campo de busqueda");
    }
    navigate(`/Busqueda/${busqueda}`);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link to="/" href="index.html" className="navbar-brand">
          <span>
            <img id="game_icon" src={images.gp3} alt="..." />
            Game_Topic
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#menu"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/Biblioteca" className="nav-link">
                Biblioteca
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/busquedaA" className="nav-link">
                Busqueda Avanzada
              </Link>
            </li>
            <NavegacionAdmin roleRequired="admin" />
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              value={busqueda}
              onChange={(ev) => setBusqueda(ev.target.value)}
              type="search"
              id="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              class="btn btn-outline-success my-2 my-sm-0"
              onClick={(ev) => (ev.preventDefault, SearchBar())}
              type="submit"
            >
              Search
            </button>
          </form>
          <ul className="navbar-nav ml-auto">
            <li>
              <IconosNav />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavFuckingbar;
