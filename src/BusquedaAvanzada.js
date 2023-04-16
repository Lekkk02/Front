import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./nav";
import "../src/assests/styles/navbar.css";
import "../src/assests/styles/gameflex.css";
import "../src/assests/styles/registro.css";
import "../src/assests/styles/busquedaA.css";

const BusquedaAvanzada = () => {
  const [ Categoria, setCategoria ] = useState('');
  const [ Precio, setPrecio ] = useState('');
  const [ Ranking, setRanking ] = useState('');
  const [ ano, setAno] = useState('');

  const navigate = useNavigate();

  function handleSubmit() {

    // Obtener valores 
    const year = ano;
    const category = Categoria;
    const price = Precio;
    const ranking = Ranking;

    if (!year || !category || !price || !ranking) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Enviar por consola para prueba
    console.log("Año:", year);
    console.log("Categoria:", category);
    console.log("Precio:", price);
    console.log("Ranking:", ranking);

    const JSONResult = {
      Año: year,
      Categoria: category,
      Precio: price,
      Ranking: Ranking
    };

    const result = JSON.stringify(JSONResult);

    navigate(`/BusquedaA/${result}`)
  };

    // Llenar el menú desplegable de años
    const currentYear = new Date().getFullYear();
    const yearsA = Array.from(
      { length: currentYear - 1950 + 1 },
      (_, i) => currentYear - i
    );

  return (
    <div className="container-fluid" >
      <Navbar />

      <div className="container mx-auto center" id="busquedaA">
        <form className="text-center" >
          <div className="form-group">
            <label for="yearSelect">Año de lanzamiento</label>
            <select id="yearSelect" value={ano} onChange={(ev) => setAno(ev.target.value)} className="form-control pl-2">
              <option value="">Seleccione año</option>
              {yearsA.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <label for="categorySelect">Categoria principal</label>
            <select id="categorySelect" value={Categoria} onChange={(ev) => setCategoria(ev.target.value)} className="form-control pl-2">
              <option value="">Seleccione categoria</option>
              <option value="accion">Acción</option>
              <option value="deportes">Deportes</option>
              <option value="aventura">Aventura</option>
              <option value="misterio">Misterio</option>
              <option value="arcade">Arcade</option>
            </select>

            <label for="priceSelect">Rango de precios</label>
            <select id="priceSelect" value={Precio} onChange={(ev) => setPrecio(ev.target.value)} class="form-control pl-2">
              <option value="">Seleccione precio</option>
              <option value="0-4.99">$0 - $4.99</option>
              <option value="5-9.99">$5 - $9.99</option>
              <option value="10-19.99">$10 - $19.99</option>
              <option value="20-29.99">$20 - $29.99</option>
              <option value="30">Más de $30</option>
            </select>

            <label for="">Ranking</label>
            <select id="rankingSelect" value={Ranking} onChange={(ev) => setRanking(ev.target.value)} class="form-control pl-2">
              <option value="default">Seleccione puntuación</option>
              <option value="1"><span>&#x2B50;</span></option>
              <option value="2"><span>&#x2B50;&#x2B50;</span></option>
              <option value="3"><span>&#x2B50;&#x2B50;&#x2B50;</span></option>
              <option value="4"><span>&#x2B50;&#x2B50;&#x2B50;&#x2B50;</span></option>
              <option value="5"><span>&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;</span></option>
            </select>

            <button type="submit" className="btn btn-primary" onClick={(ev) => (ev.preventDefault(), handleSubmit())}>
              Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default BusquedaAvanzada;