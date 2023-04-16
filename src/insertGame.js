import React, { useState } from "react";
import NavFuckingbar from "./nav";
import images from "./assests/images";
import axios from "axios";

function Insertgame() {
  let titulo = React.useRef(null);
  let descripcion = React.useRef(null);
  let puntuacione = React.useRef(null);
  let precio = React.useRef(null);
  let fechaLanzamiento = React.useRef(null);
  let edad = React.useRef(null);
  let categoria = React.useRef(null);

  function onFileSelected() {
    var file = document.getElementById("files").files;

    if (file.length > 0) {
      var fileReader = new FileReader();

      fileReader.onload = function (ev) {
        document
          .getElementById("changeImg")
          .setAttribute("src", ev.target.result);
      };

      fileReader.readAsDataURL(file[0]);
    }
  }

  const stopForm = (ev) => {
    ev.preventDefault();
  };

  /*   const form = document.getElementById("formImg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Prevents HTML handling submission
    const name = document.getElementById("titulo");
    const files = document.getElementById("files");
    const formData = new FormData();
    // Creates empty formData object
    formData.append("name", "Nombre de prueba");
    // Appends value of text input
    formData.append("files", files.files[0]);
    // Appends value(s) of file input
    // Post data to Node and Express server:
    fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData, // Payload is formData object
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }); */
  return (
    <div className="container-fluid">
      <NavFuckingbar />
      <div className="container mt-4">
        <div className="row m-5">
          <div className="col">
            <img
              className="img-thumbnail"
              alt="..."
              id="changeImg"
              src={images.gp2}
            />
            <form
              id="formImg"
              method="POST"
              action="/upload"
              encType="multipart/form-data"
            >
              <div className="form-outline mb-4">
                <input
                  className="mt-3"
                  alt="..."
                  id="files"
                  name="image"
                  onChange={(ev) => {
                    onFileSelected();
                  }}
                  type="file"
                  accept="image/*"
                  required
                ></input>
              </div>
            </form>
          </div>
          <div className="col">
            <form id="formInfo">
              <label for="titulo">Titulo del juego</label>
              <br></br>
              <input
                type="text"
                placeholder="Titulo"
                className="form-control pl-2"
                name="titulo"
                id="titulo"
                ref={titulo}
                required
              />

              <label for="categorySelect">Categoria principal</label>
              <select
                id="categorySelect"
                className="form-control pl-2"
                ref={categoria}
                required
              >
                <option value="">Seleccione categoria</option>
                <option value="accion">Acción</option>
                <option value="deportes">Deportes</option>
                <option value="aventura">Aventura</option>
                <option value="misterio">Misterio</option>
                <option value="arcade">Arcade</option>
                <option value="simulacion">Simulación</option>
                <option value="shooter">Shooter</option>
                <option value="rpg">RPG</option>
                <option value="plataforma">plataforma</option>
              </select>

              <label for="descripcion">Descripción del juego</label>
              <br></br>
              <input
                type="text"
                placeholder="Escriba una descripción del juego"
                className="form-control pl-2"
                name="descripcion"
                id="descripcion"
                ref={descripcion}
                required
              />

              <label for="precio">Precio del juego</label>
              <br></br>
              <input
                type="number"
                placeholder="Precio del juego"
                className="form-control pl-2"
                name="precio"
                id="precio"
                min="0"
                step="0.01"
                onkeypress="return event.charCode !=45"
                onpaste="return false;"
                onDrop="return false;"
                ref={precio}
                required
              />
              <label for="precio">Puntuacion del juego</label>
              <br></br>
              <input
                type="number"
                placeholder="Puntuación del juego"
                className="form-control pl-2"
                name="precio"
                id="precio"
                min="0"
                max="5"
                step="1"
                onkeypress="return event.charCode !=45"
                onpaste="return false;"
                onDrop="return false;"
                ref={puntuacione}
                required
              />
              <label for="fechaLanzamiento">Fecha de lanzamiento</label>
              <br></br>
              <input
                type="date"
                placeholder="Fecha"
                className="form-control pl-2"
                name="fechaLanzamiento"
                id="fechaLanzamiento"
                ref={fechaLanzamiento}
                required
              />

              <label for="edad">Edad Rating del juego</label>
              <br></br>
              <input
                type="number"
                placeholder="Escriba la edad del público al que va dirigido el juego"
                className="form-control pl-2"
                name="edad"
                id="edad"
                min="0"
                ref={edad}
                required
              />
            </form>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-info btn-block"
            form="formImg"
            onClick={(e) => {
              try {
                e.preventDefault();
                // Prevents HTML handling submission
                const name = document.getElementById("titulo");
                const files = document.getElementById("files");
                const formData = new FormData();
                // Creates empty formData object

                // Appends value of text input
                formData.append("image", files.files[0]);
                // Appends value(s) of file input
                // Post data to Node and Express server:
                localStorage.setItem("imgNombre", files.files[0].name);

                fetch("http://localhost:8081/upload", {
                  method: "POST",
                  body: formData, // Payload is formData object
                })
                  .then((res) => res.json())
                  .then((data) => console.log(data));
                let url = localStorage.getItem("imgNombre");
                let mon = false;

                axios.post("/api/games/addGame", {
                  titulo: titulo.current.value,
                  flanzamiento: fechaLanzamiento.current.value,
                  urlImagen: url,
                  descripcion: descripcion.current.value,
                  puntuacion: puntuacione.current.value,
                  genero: categoria.current.value,
                  precio: precio.current.value,
                  edadrating: edad.current.value,
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Insertgame;
