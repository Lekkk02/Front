import React, { useState, useEffect } from 'react';
import axios from 'axios';
import images from '../assests/images';


function Contribuciones() {
  const [contribuciones, setContribuciones] = useState([]);

  useEffect(() => {
    axios.all([
      axios.get('https://backend-production-6d58.up.railway.app/api/contribucion/getAll'),
      axios.get('https://backend-production-6d58.up.railway.app/api/users/getAllUsers'),
      axios.get('https://backend-production-6d58.up.railway.app/api/games/getAllGames')
    ])
    .then(axios.spread((contribRes, usersRes, gamesRes) => {
      // Concatenar información necesaria de las respuestas para crear la lista de contribuciones a mostrar
      const listaContribuciones = contribRes.data.map(contrib => {
        const usuario = usersRes.data.find(user => user.idusuario === contrib.idusuario);
        const juego = gamesRes.data.find(game => game.idJuego === contrib.idJuego);
        return {
          fecha: contrib.fechacontr,
          nombreUsuario: usuario.username,
          idUsuario: usuario.idusuario,
          contribucion: contrib.comentario,
          juego: juego.titulo,
          idJuego: juego.idJuego
        }
        
      });
      // Actualizar estado con la lista de contribuciones
      setContribuciones(listaContribuciones);
      console.log('Comentarios recibidos')
    }))
    .catch(error => {
      console.log(error);
    });
  }, []);
  
  if (contribuciones.length === 0) {
    return <p style={{color:'white', padding:'20px'}}>No hay contribuciones recientes</p>;
  }


  return (
    <ul>
      {contribuciones.map((contrib) => (
        <li className='contenido' key={contrib.idcontr}>
          <div className='texto-fecha'>
          <p>Fecha: {contrib.fecha}</p>
          </div>
          <div>
            <img className='img-usuario' src={images.profile} alt="Avatar" />
          </div>
          <div className='texto-actividad'>
            <p >{contrib.nombreUsuario}({contrib.idUsuario}) hizo una <b>contribución</b> en el juego "{contrib.juego}"</p>
          </div>
          <div className='texto-comentario'>
            <p>{contrib.contribucion}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Contribuciones;
