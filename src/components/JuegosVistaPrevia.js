import React, { useState, useEffect } from "react";
import "../assests/styles/gameflex.css";
import { Link } from "react-router-dom";
import axios from "axios";
import images from "../assests/images";

function VistaPrevia() {
  let [games, setGames] = useState([]);
  useEffect(() => {
    axios
      .get("https://backend-production-6d58.up.railway.app/api/games/getAllGames")
      .then((res) => {
        console.log(res.data);
        setGames(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div id="primary-container">
      {games.map((game) => {
        let path = game.urlImagen;
        let string = String();
        let name = "Biblioteca.png";
        let imagen = game.genero;
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
        return (
          <div>
            <div id="secondary-container" className="second">
              <Link to={`/game/${game.idJuego}`} style={{ color: "white" }}>
                <div id="image-container">
                  <img
                    className="game-image"
                    id="img"
                    src={path}
                  />
                  <p id="game-contr">{game.puntuacion}</p>
                </div>
                <div style={{ backgroundColor: "#250303" }}>
                  <p id="game-name">{game.titulo}</p>
                </div>
                <p>Género: {game.genero}</p>
                <p id="game-tag">Precio: {game.precio}$</p>
              </Link>
            </div>
          </div>
        );
      })}
    </div>

  );
}
export default VistaPrevia;
