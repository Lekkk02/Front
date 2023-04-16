import React from "react";
import { useParams } from "react-router";
import NavFuckingbar from "./nav";

const ResultadoBusquedaA = () => {
    const { Resultado } = useParams();
    const NoJSON = JSON.parse(Resultado);

    return(
        <div className="container-fluid">
            <NavFuckingbar />
            <div className="mx-5 mt-3">
                <p>{Resultado}</p>
                <p>{NoJSON.Año}</p>
                <p>Aqui va componente para busqueda Avanzada</p>
            </div>
            
        </div>
    );
}

export default ResultadoBusquedaA;