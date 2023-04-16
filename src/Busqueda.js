import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import NavFuckingbar from "./nav";
import { Link } from "react-router-dom";
import axios from "axios";
import { element } from "prop-types";

import "./assests/styles/busquedaResult.css"
import "./assests/styles/gameflex.css";

const Busqueda = () => {
  const { Resultado } = useParams();
  const [juegos, setJuegos] = useState([]);

  const containerStyle = {
    marginBottom: "20px"
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/games/getAllGames");
      const juegosFiltrados = res.data.filter(
        (juego) =>
        juego.nombre.toLowerCase().includes(Resultado.toLowerCase())//Metodo includes() para determinar si una cadena de texto coincide con los caracteres de la BD

        /*Metodo anterior
        juego.nombre.toLowerCase() === Resultado.toLowerCase()
        */

      );
      setJuegos(juegosFiltrados);
    };
    fetchData();
  }, [Resultado]);

  return (
    <div className="container-fluid">
      <NavFuckingbar />
      <div className="contenedor-busqueda">
        {juegos .length > 0 ? (
          juegos.map((juego) => (
           <div id="secondary-container" className="second">
           <Link to={`/game/${juego.idJuego}`} style={{color: "white"}}>
             <div id="image-container">
               <img
                 className="game-image"
                 alt="..."
                 src={require(`./assests/img/mario-party7.png`)}
               />
               <p id="game-contr">{juego.puntuacion}</p>
             </div>
             <div style={{backgroundColor: "#250303"}}>
             <p id="game-name">{juego.nombre}</p>
             </div>
             <p>Género: {juego.nombregenero}</p>
             <p id="game-tag">Precio: {juego.precio}</p>
           </Link>
         </div>
          ))
        ) : (
          <p>No se encontraron resultados para "{Resultado}"</p>
        )}
      </div>
    </div>
  );
};


export default Busqueda;





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
