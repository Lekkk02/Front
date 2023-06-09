import NavFuckingbar from './nav';
import images from './assests/images';
import React,{ useState, useEffect } from "react";
import axios from "axios";

const EliminarJuego = () => {
    const [idJuego, setIdJuego] = useState("");

    const [titulo, setTitulo] = useState("");
    const [price, setprice] = useState(0);
    const [description, setdescription] = useState("");
    const [puntuacion, setpuntuacion] = useState(0);
    const [genero, setgenero] = useState("");
    const [urlPortada, setUrlPortada] = useState("");

    const [error, setErrorMessage] = useState('');
    

    function BuscarJuego(ev){
        const getGameData = async () => {
        const { data } = await axios.get(`https://backend-production-6d58.up.railway.app/api/games/${idJuego}`);
            if (data.titulo === undefined){
                ev.preventDefault();
                return alert('El juego no existe');
            }
            setTitulo(data.titulo);
            setprice(data.precio);
            setdescription(data.descripcion);
            setpuntuacion(data.puntuacion);
            setgenero(data.genero);
            setUrlPortada(data.urlportada); 
        };
        getGameData();
        var visible = document.getElementById('alerta');
        if (idJuego === ""){
            ev.preventDefault();
            visible.classList.remove("invisible");
            visible.classList.add("visible");

        }else{
            visible.classList.remove("visible");
            visible.classList.add("invisible");
        }
    }

    function BorrarJuego(){
           /*  // DELETE request using axios with error handling
            const getDeleteData = async () => {
                axios.delete(`/api/games/${idJuego}`)
                .then(response => alert('Delete successful'))
                .catch(error => {
                    setErrorMessage(error.message);
                    console.error('There was an error!', error);
                });
            }
        getDeleteData(); */
    }

    return(
      <div className="container-fluid">
        <NavFuckingbar />
        <div className="container mt-2">
            <label for='gameid'>
                Id del juego a borrar
            </label> <br />
            <input 
                id='gameid'
                name="gameid"
                value={idJuego}
                onChange={(ev) => setIdJuego(ev.target.value)}
            />
            <button className="btn btn-primary mx-3" onClick={(ev) => BuscarJuego(ev)}>Buscar Juego</button>

            <div class="alert alert-warning mt-3 invisible" id='alerta' role="alert">El campo esta vacio!</div>

            <div className="d-flex row-flex aling-items-center mt-4">
                <div className="d-flex p-2">
                    <img className="img-thumbnail" id="Imagen-juego" alt={titulo} src={images.gp2} />
                </div>

                <div className="d-flex flex-column p-2">
                    <p className="mt-2"><b>Titulo del juego:</b></p>
                    <div id='cargarTitulo' className="mb-1">{titulo}</div>

                    <p className="mt-2"><b>Categoria principal del juego:</b></p>
                    <div id='cargarCategoria1' className="mb-1">{genero}</div>

                    <p className="mt-2"><b>Precio del juego:</b></p>
                    <div id='cargarCategoria2' className="mb-1">{price}</div>

                    <p className="mt-2"><b>Descripcion del juego:</b></p>
                    <div id="cargarDesarrollador" className="mb-1">{description}</div>

                </div>
            </div>
            <div className="d-flex row-flex my-3">
                <button 
                className="btn btn-block btn-primary btn-info" 
                onClick={(e) => {
                    try{
                        e.preventDefault();

                        function check(){
                            const GetGameData = async () => {
                                const { data } = await axios.get(`https://backend-production-6d58.up.railway.app/api/games/${idJuego}`);
                                    if (data.titulo === undefined){
                                        e.preventDefault();
                                        return alert('El juego no existe')
                                    }else{
                                        axios.delete(`https://backend-production-6d58.up.railway.app/api/games/${idJuego}`)
                                        alert('El juego ha sido borrado');
                                        window.location.reload();
                                    }
                            };
                            GetGameData();
                        }
                        check();

                        
                    } catch(error){
                        e.preventDefault();
                        console.log(error);
                    }
                }}>BORRAR DE LA BASE DE DATOS</button>
            </div>
        </div>
      </div>  
    );
}

export default EliminarJuego;