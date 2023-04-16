import NavAdmin from "./navAdmin";
import images from './assests/images';
import React,{ useState } from "react";
import axios from "axios";

function BanUsuario(){
    const [idUser, setIdUser] = useState("");

    const [username, setUsername] = useState("");
    const [correo, setCorreo] = useState(0);
    const [strikes, setStrikes] = useState(0);
    const [urlPerfil, setUrlPerfil] = useState("");

    function BuscarUser(){
        const getUserData = async () => {
        const { data } = await axios.get(`/api/users/${idUser}`);
            setUsername(data.username);
            setCorreo(data.correo);
            setStrikes(data.strikes);
            setUrlPerfil(data.imagenperfil);
        };
        getUserData();
        var imagen = document.getElementById('userImg');
        imagen.setAttribute('src', urlPerfil);
        var visible = document.getElementById('alerta');
        if (idUser === ""){
            visible.classList.remove("invisible");
            visible.classList.add("visible");
        }else{
            visible.classList.remove("visible");
            visible.classList.add("invisible");
        }
    }

    return(
      <div className="container-fluid">
        <NavAdmin />
        <div className="container mt-2">
            <label for='userid'>
                Id del usuario a bannear
            </label> <br />
            <input 
                id='userid'
                name="userid"
                value={idUser}
                onChange={(ev) => setIdUser(ev.target.value)}
            />
            <button className="btn btn-primary mx-3" onClick={BuscarUser}>Buscar Juego</button>

            <div class="alert alert-warning mt-3 invisible" id='alerta' role="alert">El campo esta vacio!</div>

            <div className="d-flex row-flex aling-items-center mt-4">
                <div className="d-flex flex-column p-2">
                    <img id="userImg" alt="..." className="img-thumbnail" src={images.gp2} /> <br />
                    <label for='userImg' className="text-center">Imagen de perfil</label>
                </div>

                <div className="d-flex flex-column p-2">
                    <p className="mt-2">Nombre de Usuario:</p>
                    <div id='cargarTitulo' className="my-1">{username}</div>

                    <p className="mt-2">Correo del usuario:</p>
                    <div id='cargarCategoria1' className="my-1">{correo}</div>

                    <p className="mt-2">Contribuciones realizadas:</p>
                    <div id='cargarContribuciones' className="my-1">{strikes}</div>

                    

                </div>
            </div>
            <div className="d-flex row-flex my-3">
                <button className="btn btn-block btn-primary btn-info">BANNEAR DE LA PLATAFORMA</button>
            </div>
        </div>
      </div>  
    );
}
{/* <p className="mt-2">Fecha de ingreso a la plataforma:</p>
                    <div id="cargarFechaIngreso" className="my-1">{}</div> */}
export default BanUsuario;