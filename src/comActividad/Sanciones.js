import React from "react";

function Sanciones(props) {
  const { sanciones } = props;

  if (sanciones.length === 0) {
    return <p>No hay sanciones recientes</p>;
  }

  return (
    <ul>
      {sanciones.map((sancion) => (
        <li className='contenido' key={sancion.id}>
          <div>
            <p className='texto-fecha'>Fecha: {sancion.date}</p>
            <img className='img-usuario' src={sancion.image} alt="Avatar"/>
          </div>
          <div>
            <p className='texto-actividad'>
              {sancion.adminName} sancionó a {sancion.username}(
              {sancion.id})
            </p>
            <p className='texto-comentario'>
            Motivo: {sancion.reason}</p>
            <p className='texto-comentario'>
            Tiempo: {sancion.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Sanciones;
