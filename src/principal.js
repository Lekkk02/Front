
import NavFuckingbar from "./nav";
import React, { Component } from "react";
import Noticia from "./components/Noticia";

const adminRole = () => {
  localStorage.setItem("role", "ADMIN");
  const role = localStorage.getItem("role");
  console.log(role);
  window.location.reload();
};

const userRole = () => {
  localStorage.setItem("role", "USER");
  const role = localStorage.getItem("role");
  console.log(role);
  window.location.reload();
};

const noRole = () => {
  localStorage.setItem("role", "");
  const role = localStorage.getItem("role");
  console.log(role);
  window.location.reload();
};

export default class principal extends Component {
  render() {
    return (
      <div id="contenido">
        <NavFuckingbar />

        <div className="jumbotron">
          <div className="container text-center">
            <h1>¡Tu informante favorito de videojuegos!</h1>
          </div>
        </div>

        <div id="primary-container" style={{display:"flex"}}>
          <div className="principal">
          <h1>Últimas noticias</h1>
            <div className="contenedor-principal">
              <Noticia
              nombre="Noticia"
              imagen="metroid"
              titulo="Ex-desarrollador de Rare se pronuncia sobre su omisión en los créditos de Metroid Prime Remastered"
              cuerpo="En un encuentro con Kiwi Talkz, ha señalado que él piensa que debería acreditarse al equipo original del desarrollo ya que todo el diseño, las secuencias de comandos, el código de IA, el código de la interfaz de usuario...Casi todo ese código está de forma general exactamente como estaba. Sin embargo, Nintendo no se ha pronunciado sobre este tema"
              />

              <Noticia
              nombre="Noticia"
              imagen="Overwatch2"
              titulo="Overwatch 2 muestra el Battle Pass de su temporada 4"
              cuerpo="Entre el contenido que nos trae el pase de batalla encontramos: dos aspectos de héroe legendarios, Asaltante espacial de Soldado 76 y Asaltante espacial de Cassidy, 2000 de divisa virtual, y un ícono de jugador exclusivo"
              />

              <Noticia
              nombre="Noticia"
              imagen="Pringles-minecraft"
              titulo="Ya existen las pringles con sabor a Minecraft"
              cuerpo="Se trata de patatas Pringles oficiales del juego, que se lanzan este mes de abril, las mismas poseen sabor a estofado sospechoso que promete una explosión de sabor rico, sustancioso y sabroso, de forma crujiente"
              />

              <Noticia
              nombre="Noticia"
              imagen="Dragon-Ball-The-Breakers"
              titulo="Dragon Ball: The Breakers se actualiza corrigiendo este error"
              cuerpo="Se ha confirmado que el juego ya tiene disponible la versión 2.5 en la cual soluciona el problema de la habilidad 'Flames of Mt. Frypan' que la hacía indestructible por Ki Blast y Super Attacks de Raider"
              />

              <Noticia
              nombre="Noticia"
              imagen="libro-recetas-minecraft"
              titulo="Ya puedes pedir el libro de recetas de cocina oficial de Minecraft"
              cuerpo="El libro se llama Minecraft: Gather, Cook, Eat! Official Cookbook, e incluye más de 40 recetas, como por ejemplo hamburguesas Mooshroom, estofado sospechoso y más. Puedes consultar su disponibilidad por 19,59$ en Amazon"
              />

              <Noticia
              nombre="Noticia"
              imagen="celeste"
              titulo="Ya puedes reservar la fantástica 'Celeste Complete Box Set Original Sountrack'"
              cuerpo="La compañía Ship to Shore Phono Co va a lanzar la caja completa de la banda sonora original de Celeste. Este pack incluye nada menos que 6 discos en vinilo. Cada disco tiene una elegante portada con un grabado muy cuidado y con mucho detalle. Podréis disfrutar de todas las canciones incluidas en el videojuego."
              />

              <Noticia
              nombre="Noticia"
              imagen="Digimon-World"
              titulo="Digimon World: Next Order recibe voces en japonés en Europa"
              cuerpo="Ya se encuentra disponible la actualización con la función de audio dual. Hasta ahora esto no había estado disponible, lo que significa que no se puede jugar con el audio en japonés y subtítulos en otro idioma. Esto sí era posible en las versiones de PlayStation 4 y Steam, pero no en la de Nintendo Switch. Esta sólo incluía audio en inglés"
              />
            </div>
          </div>
        </div>



        <button onClick={adminRole}>Presiona para ser Admin</button>
        <button onClick={userRole} className="mt-3">
          Presiona para ser usuario
        </button>
        <button onClick={noRole} className="mt-3">
          Presiona para no tener rol
        </button>
      </div>
    );
  }
}
