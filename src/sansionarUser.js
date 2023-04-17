import NavAdmin from "./navAdmin";
import images from './assests/images';
import React,{ useState } from "react";
import axios from "axios";

function SansionarUsuario(){
    const [idUser, setIdUser] = useState("");

    const [username, setUsername] = useState("");
    const [correo, setCorreo] = useState(0);
    const [strikes, setStrikes] = useState(0);

    function BuscarUser(){
        const getUserData = async () => {
            const { data } = await axios.get(`https://backend-production-6d58.up.railway.app/api/users/${idUser}`);
                if (data.username === undefined){
                    return alert('El usuario no existe');
                }
                setUsername(data.username);
                setCorreo(data.correo);
                setStrikes(data.strikes);
            };
        getUserData();
        var visible = document.getElementById('alerta');
        if (idUser === ""){
            visible.classList.remove("invisible");
            visible.classList.add("visible");
        }else{
            visible.classList.remove("visible");
            visible.classList.add("invisible");
        }
    }

    function StrikeUser(){
        axios.get(`https://backend-production-6d58.up.railway.app/api/users/strikes/${idUser}`)
        .then(res => alert('Strike añadido', res))
        .catch(err => alert('Hubo un error', err))
    }

    return(
      <div className="container-fluid">
        <NavAdmin />
        <div className="container mt-2">
            <label for='userid'>
                Id del usuario a sancionar
            </label> <br />
            <input 
                id='userid'
                name="userid"
                value={idUser}
                onChange={(ev) => setIdUser(ev.target.value)}
            />
            <button className="btn btn-primary mx-3" onClick={BuscarUser}>Buscar Usuario</button>

            <div class="alert alert-warning mt-3 invisible" id='alerta' role="alert">El campo esta vacio!</div>

            <div className="d-flex row-flex aling-items-center mt-4">
                <div className="d-flex flex-column p-2">
                    <img id="userImg" alt="..." className="img-thumbnail" src={images.gp2} /> <br />
                </div>

                <div className="d-flex flex-column p-2">
                    <p className="mt-2"><b>Nombre de Usuario:</b></p>
                    <p id='cargarTitulo'>{username}</p>

                    <p className="my-3"><b>Correo del usuario:</b></p>
                    <p id='cargarCategoria1'>{correo}</p>

                    <div className=" d-flex row-flex" id='cargarSansiones'>
                        <p className="mt-3"><b>Sanciones:</b></p>
                        <h2 className="visible mx-2 mt-2">{strikes}</h2>
                    </div>

                </div>
            </div>
            <div className="d-flex row-flex my-3">
                <button className="btn btn-block btn-primary btn-info" onClick={() => {
                    axios.put(`https://backend-production-6d58.up.railway.app/api/users/strikes/${idUser}`).then((res) => {console.log(res)}).catch((error) => {console.log(error)})
                    window.location.reload()

                }}>SANCIONAR USUARIO DE LA PLATAFORMA</button>
            </div>
        </div>
      </div>  
    );
}
{/* <p className="my-3">Contribuciones realizadas:</p>
                    <div id='cargarContribuciones'>{user.contribuciones}</div>

                    <p className="my-3">Fecha de ingreso a la plataforma:</p>
                    <div id="cargarFechaIngreso">{user.fechaIngreso}</div> */}
export default SansionarUsuario;