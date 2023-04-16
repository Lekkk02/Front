import React from "react";
import "../assests/styles/gameflex.css";

function Noticia(props) {
    return(
        <div className="contenedor-noticia">
			<img 
				className="imagen-noticia"
				src={require(`../assests/img/noticias/${props.imagen}.png`)}
				alt="..." />
			<div className="contenedor-texto-noticia"> 
				<p className="nombre-noticia"><strong>{props.nombre}</strong></p> 
				<p className="titulo-noticia"><strong>{props.titulo}</strong></p>
				<p className="cuerpo-noticia">"{props.cuerpo}"</p>
			</div>
		</div>
    );
}

export default Noticia;