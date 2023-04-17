import React from "react";
import { useNavigate } from "react-router-dom";
import NavFuckingbar from './nav';
import axios from "axios";

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
                <button className='btn btn-primary' id="anadirJ" onClick={(ev) => navigate("/insertGame")}>
                  Añadir juego
                </button>{" "}
                <br />
                <label for="anadirJ">Para añadir un juego</label>
              </div>

              <div className="p-2">
                <button className='btn btn-primary' id="elimJ" onClick={(ev) => navigate("/deleteGame")}>
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
                <button className='btn btn-primary' id="ban" onClick={(ev) => navigate("/banUser")}>
                  Banear
                </button>
                <br />
                <label for="ban">Para banear un usuario</label>
              </div>
              <div className="p-2">
                <button className='btn btn-primary' id="san" onClick={(ev) => navigate("/SanUser")}>
                  Sancionar
                </button>{" "}
                <br />
                <label for="san">Para Sancionar un usuario</label>
              </div>
            </div>
          </section>
          <section className="mt-5">
            <h4>Reportes</h4>
            <hr />
            <div className="d-flex flex-row justify-content-around">
              <div className="p-2">
                <button id="report" className='btn btn-primary' onClick={() => {
                    const { jsPDF } = require("jspdf");
                    require("jspdf-autotable");
                    async function usuarios() {
                      var doc = new jsPDF();
                      const datos = await axios.get("https://backend-production-6d58.up.railway.app/api/users/getAllUsers");
                      const data = datos.data;
                      // Definir el contenido del JSON
                      /*    var data = [
                        { id: 1, name: "John Doe", email: "johndoe@example.com" },
                        { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
                        { id: 3, name: "Bob Johnson", email: "bobjohnson@example.com" },
                      ];
                   */
                      // Definir las columnas de la tabla
                      var columns = ["ID", "Nombre de usuario", "Correo electrónico"];
                
                      // Definir la posición inicial de la tabla
                      var startX = 10;
                      var startY = 10;
                
                      // Definir el ancho de cada columna
                      var columnWidths = [20, 80, 80];
                
                      // Definir el tamaño de la fuente
                      var fontSize = 12;
                
                      // Definir el tamaño de la tabla
                      var pageWidth = doc.internal.pageSize.width;
                      var pageHeight = doc.internal.pageSize.height;
                      var tableWidth = columnWidths.reduce((acc, cur) => acc + cur);
                      var tableHeight = (data.length + 1) * fontSize * 1.2;
                      var x = (pageWidth - tableWidth) / 2;
                      var y = (pageHeight - tableHeight) / 2;
                
                      // Crear la tabla
                      doc.setFontSize(fontSize);
                      doc.text("Lista de usuarios", x, startY);
                      doc.autoTable({
                        startY: y + fontSize * 1.5,
                        head: [columns],
                        body: data.map((obj) => [obj.idusuario, obj.username, obj.correo]),
                        startY: y,
                        theme: "grid",
                        columnStyles: {
                          0: { cellWidth: columnWidths[0] },
                          1: { cellWidth: columnWidths[1] },
                          2: { cellWidth: columnWidths[2] },
                        },
                      });
                
                      // Guardar el PDF
                      doc.save("lista_usuarios.pdf");
                    }
                    async function juegos() {
                      const doc = new jsPDF();
                      const datos = await axios.get("https://backend-production-6d58.up.railway.app/api/games/getAllGames");
                      const data = datos.data;
                      // Definir el contenido del JSON
                      /*    var data = [
                        { id: 1, name: "John Doe", email: "johndoe@example.com" },
                        { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
                        { id: 3, name: "Bob Johnson", email: "bobjohnson@example.com" },
                      ];
                   */
                      // Definir las columnas de la tabla
                      var columns = ["ID", "Nombre de juego", "Precio"];
                
                      // Definir la posición inicial de la tabla
                      var startX = 10;
                      var startY = 10;
                
                      // Definir el ancho de cada columna
                      var columnWidths = [20, 80, 20];
                
                      // Definir el tamaño de la fuente
                      var fontSize = 12;
                
                      // Definir el tamaño de la tabla
                      var pageWidth = doc.internal.pageSize.width;
                      var pageHeight = doc.internal.pageSize.height;
                      var tableWidth = columnWidths.reduce((acc, cur) => acc + cur);
                      var tableHeight = (data.length + 1) * fontSize * 1.2;
                      var x = (pageWidth - tableWidth) / 2;
                      var y = (pageHeight - tableHeight) / 2;
                
                      // Crear la tabla
                      doc.setFontSize(fontSize);
                      doc.text("Lista de juegos", x, startY);
                      doc.autoTable({
                        startY: y + fontSize * 1.5,
                        head: [columns],
                        body: data.map((obj) => [obj.idJuego, obj.titulo, obj.precio]),
                        startY: y,
                        theme: "grid",
                        columnStyles: {
                          0: { cellWidth: columnWidths[0] },
                          1: { cellWidth: columnWidths[1] },
                          2: { cellWidth: columnWidths[2] },
                        },
                      });
                
                      // Guardar el PDF
                      doc.save("lista_juegos.pdf");
                    }
                    async function contribuciones() {
                      const doc = new jsPDF();
                      const datos = await axios.get("https://backend-production-6d58.up.railway.app/api/contribucion/getAll");
                      const data = datos.data;
                      // Definir el contenido del JSON
                      /*    var data = [
                        { id: 1, name: "John Doe", email: "johndoe@example.com" },
                        { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
                        { id: 3, name: "Bob Johnson", email: "bobjohnson@example.com" },
                      ];
                   */
                      // Definir las columnas de la tabla
                      var columns = [
                        "ID Contribución",
                        "ID de Usuario",
                        "ID Juego",
                        "Calificación",
                        "Fecha",
                      ];
                
                      // Definir la posición inicial de la tabla
                      var startX = 10;
                      var startY = 10;
                
                      // Definir el ancho de cada columna
                      var columnWidths = [30, 30, 30, 30, 40];
                
                      // Definir el tamaño de la fuente
                      var fontSize = 12;
                
                      // Definir el tamaño de la tabla
                      var pageWidth = doc.internal.pageSize.width;
                      var pageHeight = doc.internal.pageSize.height;
                      var tableWidth = columnWidths.reduce((acc, cur) => acc + cur);
                      var tableHeight = (data.length + 1) * fontSize * 1.2;
                      var x = (pageWidth - tableWidth) / 2;
                      var y = (pageHeight - tableHeight) / 2;
                
                      // Crear la tabla
                      doc.setFontSize(fontSize);
                      doc.text("Lista de contribuciones", x, startY);
                      doc.autoTable({
                        startY: y + fontSize * 1.5,
                        head: [columns],
                        body: data.map((obj) => [
                          obj.idcontr,
                          obj.idusuario,
                          obj.idJuego,
                          obj.calif,
                          obj.fechacontr,
                        ]),
                        startY: y,
                        theme: "grid",
                        columnStyles: {
                          0: { cellWidth: columnWidths[0] },
                          1: { cellWidth: columnWidths[1] },
                          2: { cellWidth: columnWidths[2] },
                          3: { cellWidth: columnWidths[3] },
                          4: { cellWidth: columnWidths[4] },
                        },
                        didDrawPage: function (data) {
                          tableHeight = doc.autoTableEndPosY() + 10;
                        },
                        autoSize: {
                          theme: "grid",
                          tableWidth: "wrap",
                          cellPadding: 1,
                          fontSize: fontSize,
                          minCellWidth: 10,
                          minCellHeight: 4,
                        },
                      });
                
                      // Guardar el PDF
                      doc.save("lista_Contribuciones.pdf");
                    }
                    usuarios();
                    juegos();
                    contribuciones();
                }}>
                  Generar reporte
                </button>
                <br />
                <br />
              </div>
            </div>
          </section>
          <section className="mt-5">
            <h4>Respaldo</h4>
            <hr />
            <a className="mb-5 btn btn-primary" href='https://github.com/PichiGod/gametopic-pichi.git'>Respaldo</a>
          </section>

        </div>
      </div>
    </div>
  );
}

export default OpcionAdmin;
