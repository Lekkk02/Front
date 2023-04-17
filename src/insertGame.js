import React, { useState } from "react";
import NavFuckingbar from "./nav";
import images from "./assests/images";
import axios from "axios";

function Insertgame() {
  var hoy = new Date();
  hoy.setHours(0,0,0,0);
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
                name="puntuacion"
                id="puntuacion"
                min="0"
                max="5"
                step="1"
                onKeyPress={(event) => event.preventDefault()}
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
                //onKeyPress={(event) => event.preventDefault()}
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
                onKeyPress={(event) => event.preventDefault()}
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
                // Appends value of text input
                //formData.append("image", files.files[0]);
                // Appends value(s) of file input
                // Post data to Node and Express server:
                //localStorage.setItem("imgNombre", files.files[0].name);


                let url = categoria.current.value;
                if (url === 'deportes'){
                  url = images.deporte;
                }else if(url === 'accion'){
                  url = images.accion;
                }else if(url === 'aventura'){
                  url = images.aventura;
                }else if(url === 'misterio'){
                  url = images.misterio;
                }else if(url === 'arcade'){
                  url = images.arcade;
                }else if(url === 'simulacion'){
                  url = images.simulacion;
                }else if(url === 'shooter'){
                  url = images.shooter;
                }else if(url === 'rpg'){
                  url = images.rpg;
                }else if(url === 'plataforma'){
                  url = images.plataforma;
                }

                let mon = false;

                const ComprobarJuego = async () => {
                  const res = await axios.get("https://backend-production-6d58.up.railway.app/api/games/getAllGames", {
                    responseType: "json",
                  });
                  const match = res["data"].find((element) => {
                      return element.titulo === titulo.current.value;
                  });
                  if (match){
                      return true;
                  }else{
                      return false;
                  }
                };

                const Comprobacion = async () => {
                  let Verificar = new Date(fechaLanzamiento.current.value);
                  if (titulo.current.value.trim() == ''){
                    return alert('Rellene el campo de Titulo del juego');
                  }else if(fechaLanzamiento.current.value == '' || Verificar > hoy){
                    return alert('Inserte una fecha valida');
                  }else if(descripcion.current.value == ''){
                    return alert('Inserte una descripcion');
                  }else if(puntuacione.current.value == ''){
                    return alert('Agrege su puntuacion del juego');
                  }else if (categoria.current.value == ''){
                    return alert('Inserte una categoria');
                  }else if (precio.current.value == '' || precio.current.value < 0){
                    return alert('Inserte un precio valido del juego');
                  }else if (edad.current.value == ''){
                    return alert('Inserte la calificacion de contenido del juego');
                  }
                  let result = await ComprobarJuego();
                  if (result == true){
                    alert('El juego ya existe.');
                  }else{
                    axios.post("https://backend-production-6d58.up.railway.app/api/games/addGame", {
                      titulo: titulo.current.value,
                      flanzamiento: fechaLanzamiento.current.value,
                      urlImagen: url,
                      descripcion: descripcion.current.value,
                      puntuacion: puntuacione.current.value,
                      genero: categoria.current.value,
                      precio: precio.current.value,
                      edadrating: edad.current.value,
                    }); 
                    alert('El juego fue insertado');
                    window.location.reload();
                  }
                }

                Comprobacion();

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
