import React from 'react';


function Contribuciones(props) {
  const { contribuciones } = props;

  if (contribuciones.length === 0) {
    return <p>No hay contribuciones recientes</p>;
  }

  return (
    <ul>
      {contribuciones.map((contribucion) => (
        <li className='contenido' key={contribucion.id}>
          <div className='texto-fecha'>
          <p>Fecha: {contribucion.date}</p>
          </div>
          <div>
            <img className='img-usuario' src={contribucion.image} alt="Avatar" />
          </div>
          <div className='texto-actividad'>
            <p >{contribucion.username}({contribucion.id}) hizo una <b>contribución</b> en el juego "{contribucion.game}"</p>
          </div>
          <div className='texto-comentario'>
            <p>{contribucion.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Contribuciones;
