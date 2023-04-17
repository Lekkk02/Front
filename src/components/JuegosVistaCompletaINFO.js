import axios from "axios";
import React, { useEffect, useState, Component } from "react";
import { useParams } from "react-router-dom";
import "../assests/styles/gameflex.css";
import { Link } from "react-router-dom";
import images from "../assests/images";

////////////////////////////////////// CONTRIBUCION

const NoTenerContribucion = () => {
  const _user = localStorage.getItem("role");
  console.log(_user);
};

let userID = localStorage.getItem("idusuario");

const JuegosVistaCompletaINFO = () => {
  let auth = false;
  const { id } = useParams();
  const [nombre, setTitle] = useState("");
  const [price, setprice] = useState(0);
  const [description, setdescription] = useState("");
  const [puntuacion, setpuntuacion] = useState(0);
  const [genero, setgenero] = useState("");

  let imagen;

  let inputComentario = React.useRef(null);
  let inputCalif = React.useRef(null);
  const idusuario = localStorage.getItem("idusuario");

  useEffect(() => {
    const getGameData = async () => {
      const { data } = await axios.get(`https://backend-production-6d58.up.railway.app/api/games/${id}`);
      setTitle(data.titulo);
      setprice(data.precio);
      setdescription(data.descripcion);
      setpuntuacion(data.puntuacion);
      setgenero(data.genero);
    };
    getGameData();
    
  }, []);
  const Props = `{
        "roleRequired":["ADMIN", "USER"]
    }`;
  const Props1 = `{
        "contribucionExistente": true
    }`;
  if (genero === 'deportes'){
    imagen = images.deporte;
  }else if(genero === 'accion'){
    imagen = images.accion;
  }else if(genero === 'aventura'){
    imagen = images.aventura;
  }else if(genero === 'misterio'){
    imagen = images.misterio;
  }else if(genero === 'arcade'){
    imagen = images.arcade;
  }else if(genero === 'simulacion'){
    imagen = images.simulacion;
  }else if(genero === 'shooter'){
    imagen = images.shooter;
  }else if(genero === 'rpg'){
    imagen = images.rpg;
  }else if(genero === 'plataforma'){
    imagen = images.plataforma;
  }

  const pprops = JSON.parse(Props);

  const autenticacion = () => {
    let user;
    const _user = localStorage.getItem("role");
    if (_user) {
      user = _user;
      console.log("role: ", user);
    }
    if (user) {
      return user;
    } else {
      return "";
    }
  };

  const contribucionVer = () => {
    let user;
    const _user = localStorage.getItem("role");

    if (_user) {
      user = _user;
      console.log("role: ", user);
    }

    if (user) {
      return user;
    } else {
      return "";
    }
  };

  const getContr = async () => {
    const data = await axios.get(`https://backend-production-6d58.up.railway.app/api/contribucion/getGameContrib/${id}`);
    return data;
  };
  const checkUser = async () => {
    let contribs = await getContr();
    if (contribs.data !== null) {
      contribs.data.forEach((element) => {
        if (element.idusuario == userID) {
          auth = true;
          return true;
        }
        auth = false;
      });
    }
  };

  const Contribuciones = () => {
    var altSubmit = async (ev) => {
      ev.preventDefault();
      console.log("Contribución enviada");
      let calificacion = parseInt(inputCalif.current.value);
      let comment = inputComentario.current.value;
      await axios.post("https://backend-production-6d58.up.railway.app/api/contribucion/addContrib", {
        calif: calificacion,
        comentario: comment,
        idusuario: idusuario,
        idJuego: id,
      });
      window.location.reload();
    };
    const AuthContribucion = () => {
      checkUser();
      console.log("Auth value is: ", auth);
      if (auth) {
        console.log("Check is True");
        return (
          <div>
            <input
              className="form-control pl-2"
              type="text"
              name="contribucion"
              id="contribucion"
              placeholder="Ya usted tiene una contribucion en este juego"
              disabled
            />
          </div>
        );
      } else {
        console.log("Check is False");

        return (
          <div>
            <form id="addContribucionForm" onSubmit={altSubmit}>
              <input
                className="form-control pl-2"
                type="text"
                name="contribucion"
                id="contribucion"
                ref={inputComentario}
                placeholder="Escriba una contribucion!"
                required
              />
              <select name="calif" id="califSelect" ref={inputCalif} required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </form>
          </div>
        );
      }
    };

    const TieneContribucion = () => {
      const { roleRequired } = pprops;
      const rol = autenticacion();

      function LoggedIn() {
        if (roleRequired[1] === rol) {
          return <AuthContribucion />;
        } else if (roleRequired[0] === rol) {
          return <AuthContribucion />;
        } else {
          return (
            <div>
              <input
                className="form-control pl-2"
                type="text"
                name="contribucion"
                id="contribucion"
                placeholder="No puedes añadir una contribucion. Inicia Seccion si desea enviar una contribucion"
                disabled
              />
            </div>
          );
        }
      }

      return <LoggedIn />;
    };

    let [contribucion, setContribucion] = useState([]);
    useEffect(() => {
      //const Data = async () => {
      /*const { data } = await*/ axios
        .get(`https://backend-production-6d58.up.railway.app/api/contribucion/getGameContrib/${id}`)
        .then((res) => {
          console.log(res.data);
          setContribucion(res.data);
        })
        .catch((err) => console.log(err));
      //};
      //Data();
    }, []);

    return (
      <div>
        <div className="game-comentarios-titulo">
          <p>
            <b>Añade una contribución</b>
          </p>

          <div
            style={{
              paddingLeft: "40px",
              paddingRight: "60px",
              paddingTop: "20px",
            }}
          >
            <TieneContribucion roleRequired="ADMIN" />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              <div style={{ paddingRight: "60px" }}>
                <button>Borrar mensaje</button>
              </div>
              <div>
                <button onClick={altSubmit}>Enviar contribución</button>
              </div>
            </div>
          </div>
          <p style={{ paddingTop: "100px" }}>
            <b>Comentarios de los usuarios</b>
          </p>
        </div>

        <div>
          {contribucion.map((contri) => {
            return (
              <div
                style={{
                  paddingLeft: "150px",
                  paddingRight: "150px",
                  paddingBottom: "20px",
                }}
              >
                <div className="game-comentarios">
                  <div className="comentario-nombre">
                    <p>
                      <b>ID Usuario: {contri.idusuario}</b>
                    </p>
                  </div>
                  <div className="comentario-fecha">
                    <p>Publicado el: {contri.fechacontr}</p>
                  </div>
                  <div className="comentario-mensaje">
                    <p>{contri.comentario}</p>
                  </div>
                  <div className="comentario-calificacion">
                    <p>Valoración: {contri.calif}/5</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    );
  };

  return (
    <div id="game-container-MainView" className="game-container-MainView">
      <div className="game-container-title">
        <Link to="/Biblioteca" className="boton-retroceder">
          <img
            style={{ paddingLeft: "10px", paddingBottom: "10px" }}
            src={require(`../assests/img/flecha-retroceso.png`)}
            alt="..."
          />
        </Link>
        <b className="mx-3" style={{ fontSize: "38px" }}>{nombre}</b>
        <a href="https://www.epicgames.com/site/es-ES/home" target="blank">
          <img
            style={{
              width: "50px",
              height: "auto",
              paddingRight: "10px",
              paddingTop: "10px",
            }}
            align="right"
            src={require(`../assests/img/icono-steam/epic-games.png`)}
            alt="..."
          />
        </a>
        <a href="https://store.steampowered.com/" target="blank">
          <img
            style={{
              width: "50px",
              height: "auto",
              paddingRight: "10px",
              paddingTop: "10px",
            }}
            align="right"
            src={require(`../assests/img/icono-steam/steam.png`)}
            alt="..."
          />
        </a>
        <div className="game-container-View">
          <img
            className="game-image-FullView"
            src={imagen}
            alt="..."
          />
          <div className="game-text-LeftView">
            <div className="game-genero">
              <p>
                <b>Géneros: </b>
                {genero}
              </p>
            </div>

            <div className="game-descripcion">
              <p id="Juego-Descripcion">
                <b>Descripción: </b>
                {description}
              </p>
            </div>

            <div className="game-precio">
              <p>
                <b style={{ textAlign: "left" }}>Precios: </b>
                {price}
              </p>
            </div>

            <div className="game-valoracion">
              <p>
                <b style={{ textAlign: "right" }}>
                  Puntuación de los usuarios:{" "}
                </b>{" "}
                {puntuacion}/5
                <div className="contenedor-estrellas">
                  {puntuacion < 0.5 ? (
                    <img
                      className="image-puntuación"
                      src={require(`../assests/img/puntuacion-estrellas/puntuacion-estrellas-rojas-0.png`)}
                      alt="..."
                    />
                  ) : null}
                  {puntuacion >= 0.5 && puntuacion < 1.0 ? (
                    <img
                      className="image-puntuación"
                      src={require(`../assests/img/puntuacion-estrellas/puntuacion-estrellas-rojas-1.png`)}
                      alt="..."
                    />
                  ) : null}
                  {puntuacion >= 1.0 && puntuacion < 1.5 ? (
                    <img
                      className="image-puntuación"
                      src={require(`../assests/img/puntuacion-estrellas/puntuacion-estrellas-rojas-2.png`)}
                      alt="..."
                    />
                  ) : null}
                  {puntuacion >= 1.5 && puntuacion < 2.0 ? (
                    <img
                      className="image-puntuación"
                      src={require(`../assests/img/puntuacion-estrellas/puntuacion-estrellas-rojas-3.png`)}
                      alt="..."
                    />
                  ) : null}
                  {puntuacion >= 2.0 && puntuacion < 2.5 ? (
                    <img
                      className="image-puntuación"
                      src={require(`../assests/img/puntuacion-estrellas/puntuacion-estrellas-rojas-4.png`)}
                      alt="..."
                    />
                  ) : null}
                  {puntuacion >= 2.5 && puntuacion < 3.0 ? (
                    <img
                      className="image-puntuación"
                      src={require(`../assests/img/puntuacion-estrellas/puntuacion-estrellas-rojas-5.png`)}
                      alt="..."
                    />
                  ) : null}
                  {puntuacion >= 3.0 && puntuacion < 3.5 ? (
                    <img
                      className="image-puntuación"
                      src={require(`../assests/img/puntuacion-estrellas/puntuacion-estrellas-rojas-6.png`)}
                      alt="..."
                    />
                  ) : null}
                  {puntuacion >= 3.5 && puntuacion < 4.0 ? (
                    <img
                      className="image-puntuación"
                      src={require(`../assests/img/puntuacion-estrellas/puntuacion-estrellas-rojas-7.png`)}
                      alt="..."
                    />
                  ) : null}
                  {puntuacion >= 4.0 && puntuacion < 4.5 ? (
                    <img
                      className="image-puntuación"
                      src={require(`../assests/img/puntuacion-estrellas/puntuacion-estrellas-rojas-8.png`)}
                      alt="..."
                    />
                  ) : null}
                  {puntuacion >= 4.5 && puntuacion < 5.0 ? (
                    <img
                      className="image-puntuación"
                      src={require(`../assests/img/puntuacion-estrellas/puntuacion-estrellas-rojas-9.png`)}
                      alt="..."
                    />
                  ) : null}
                  {puntuacion >= 5.0 ? (
                    <img
                      className="image-puntuación"
                      src={require(`../assests/img/puntuacion-estrellas/puntuacion-estrellas-rojas-10.png`)}
                      alt="..."
                    />
                  ) : null}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ boxSizing: "border-box", marginTop: "30px" }}>
        <Contribuciones />
      </div>
    </div>
  );

  /*<p>Comentario de prueba</p>
      <p>Este es {props.JuegoId} esto es de pichi, lo puse aca</p> */

  //////////////////////////////////// CONTRIBUCION
};

export default JuegosVistaCompletaINFO;
