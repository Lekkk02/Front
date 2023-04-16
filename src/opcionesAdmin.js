import React from "react";
import { useNavigate } from "react-router-dom";
import NavFuckingbar from './nav';

function OpcionAdmin() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <NavFuckingbar />

      <div className="container text-center mt-4">
        <h3>Opciones de admin</h3>
        <div className="d-flex flex-column aling-items-center mt-5">
          <section>
            <h4>Juegos</h4>
            <hr />
            <div className="d-flex flex-row justify-content-around">
              <div className="p-2">
                <button id="anadirJ" onClick={(ev) => navigate("/insertGame")}>
                  Añadir juego
                </button>{" "}
                <br />
                <label for="anadirJ">Para añadir un juego</label>
              </div>

              <div className="p-2">
                <button id="elimJ" onClick={(ev) => navigate("/deleteGame")}>
                  Eliminar juego
                </button>{" "}
                <br />
                <label for="elimJ">Para Eliminar un juego</label>
              </div>
            </div>
          </section>

          <section className="mt-5">
            <h4>Banear / Sancionar</h4>
            <hr />
            <div className="d-flex flex-row justify-content-around">
              <div className="p-2">
                <button id="ban" onClick={(ev) => navigate("/banUser")}>
                  Banear
                </button>
                <br />
                <label for="ban">Para banear un usuario</label>
              </div>
              <div className="p-2">
                <button id="san" onClick={(ev) => navigate("/SanUser")}>
                  Sancionar
                </button>{" "}
                <br />
                <label for="san">Para Sancionar un usuario</label>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default OpcionAdmin;
