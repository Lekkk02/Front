import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import NavFuckingbar from "./nav";
import { Link } from "react-router-dom";
import axios from "axios";
import images from "./assests/images";

import "./assests/styles/busquedaResult.css"
import "./assests/styles/gameflex.css";


const Busqueda = () => {
  const { Resultado } = useParams();
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend-production-6d58.up.railway.app/api/games/getAllGames")
      .then((res) => {
        const juegosFiltrados = res.data.filter(
          (juego) =>
            juego.titulo.toLowerCase().includes(Resultado.toLowerCase())
        );
        setJuegos(juegosFiltrados);
      })
      .catch((err) => console.log("Error en la consulta a la API:", err));
  }, [Resultado]);

  return (
    <div className="container-fluid">
      <NavFuckingbar />
      <div className="contenedor-busqueda">
        {juegos.length > 0 ? (
          juegos.map((juego) => {
            let imagen = juego.genero;
            if (imagen === 'deportes'){
              imagen = images.deporte;
            }else if(imagen === 'accion'){
              imagen = images.accion;
            }else if(imagen === 'aventura'){
              imagen = images.aventura;
            }else if(imagen === 'misterio'){
              imagen = images.misterio;
            }else if(imagen === 'arcade'){
              imagen = images.arcade;
            }else if(imagen === 'simulacion'){
              imagen = images.simulacion;
            }else if(imagen === 'shooter'){
              imagen = images.shooter;
            }else if(imagen === 'rpg'){
              imagen = images.rpg;
            }else if(imagen === 'plataforma'){
              imagen = images.plataforma;
            }

            return(
              <div
                id="secondary-container"
                className="second"
                key={juego.idJuego}
              >
                <Link to={`/game/${juego.idJuego}`} style={{ color: "white" }}>
                  <div id="image-container">
                    <img
                      className="game-image"
                      alt="..."
                      src={imagen}
                    />
                    <p id="game-contr">{juego.puntuacion}</p>
                  </div>
                  <div style={{ backgroundColor: "#250303" }}>
                    <p id="game-name">{juego.titulo}</p>
                  </div>
                  <p>Género: {juego.genero}</p>
                  <p id="game-tag">Precio: {juego.precio}</p>
                </Link>
              </div>
            );
          }
          
        ) ): (
          <p>No se encontraron resultados para "{Resultado}"</p>
        )}
      </div>
    </div>
  );
};

export default Busqueda;



  /*const fetchData = async () => {
      const res = await axios.get("/api/games/getAllGames");
      const juegosFiltrados = res.data.filter(
        (juego) =>
        juego.nombre.toLowerCase().includes(Resultado.toLowerCase())
      );
      setJuegos(juegosFiltrados);
    };
    fetchData();
  }, [Resultado]);
 */

/* const Busqueda = () => {
  const { Resultado } = useParams();

  const buscarResultado = async () => {
    const res = await axios.get("/api/games/getAllGames", {
      responseType: "json",
    });
     const search = res["data"].find((element) => {
            return element.nombre; 
        });
  };
 */
