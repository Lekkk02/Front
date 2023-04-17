import React, { useState, useEffect } from "react";
import Axios from "axios";

function ShowGames() {
  let [games, setGames] = useState([]);
  useEffect(() => {
    Axios.get("/api/games/getAllGames")
      .then((res) => {
        console.log(res.data);
        setGames(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h1>Something</h1>
      {games.map((game) => {
        return <li key={game.idJuego}>{game.nombre}</li>;
      })}
    </>
  );
}

export default ShowGames;
