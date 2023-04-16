import React from 'react';

function GestionMultimedia(props) {
  const { gestionMultimedia } = props;

  if (gestionMultimedia.length === 0) {
    return <p>No hay actividad de gestión multimedia reciente</p>;
  }

  return (
    <ul>
      {gestionMultimedia.map((multimedia) => (
        <li className='contenido' key={multimedia.id}>
          <div>
            <p className='texto-fecha'>{multimedia.date}</p>
            <img className='img-juego' src={multimedia.image} alt={multimedia.gameName} />
          </div>
          <div>
            <p className='texto-actividad'>{multimedia.adminName} subió un juego </p>
          </div>
          <div className='texto-comentario'>
          <p>Nombre: {multimedia.gameName}</p>
          <p>Género: {multimedia.genre}</p>
          </div >
        </li>
      ))}
    </ul>
  );
}

export default GestionMultimedia;
