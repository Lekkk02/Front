import React from "react";

function Baneos(props) {
  const { baneos } = props;

  if (baneos.length === 0) {
    return <p>No hay baneos recientes</p>;
  }

  return (
    <ul>
      {baneos.map((baneo) => (
        <li className="contenido" key={baneo.id}>
          <div>
            <p className="texto-fecha">Fecha: {baneo.date}</p>
            <img className="img-usuario" src={baneo.image} alt="Avatar" />
          </div>
          <div>
            <p className="texto-actividad">
              {baneo.adminName} baneó a {baneo.username}({baneo.id})
            </p>
          </div>
          <div>
            <p className="texto-comentario">Motivo: {baneo.reason}</p>
            <p className="texto-comentario">Tiempo: {baneo.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Baneos;
