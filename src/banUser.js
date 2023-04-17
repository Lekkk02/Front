import NavAdmin from "./navAdmin";
import NavFuckingbar from "./nav";
import images from './assests/images';
import React,{ useState } from "react";
import axios from "axios";

function BanUsuario(){
    const [idUser, setIdUser] = useState("");

    const [username, setUsername] = useState("");
    const [correo, setCorreo] = useState('');
    const [strikes, setStrikes] = useState(0);
    function BuscarUser(){
        const getUserData = async () => {
        const { data } = await axios.get(`https://backend-production-6d58.up.railway.app/api/users/${idUser}`);
            if(data.username === undefined){
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

    return(
      <div className="container-fluid">
        <NavFuckingbar />
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
            <button className="btn btn-primary mx-3" onClick={BuscarUser}>Buscar Usuario</button>

            <div class="alert alert-warning mt-3 invisible" id='alerta' role="alert">El campo esta vacio!</div>

            <div className="d-flex row-flex aling-items-center mt-4">
                <div className="d-flex flex-column p-2">
                    <img id="userImg" alt="..." className="img-thumbnail" src={images.gp2} />
                </div>

                <div className="d-flex flex-column p-2">
                    <p className=""><b>Nombre de Usuario:</b></p>
                    <p id='cargarTitulo' className="mx-2">{username}</p>

                    <p className=""><b>Correo del usuario:</b></p>
                    <p id='cargarCategoria1' className="mx-2">{correo}</p>

                    <div className=" d-flex row-flex" id='cargarSansiones'>
                        <p className="mt-3"><b>Sansiones:</b></p>
                        <h2 className="visible mx-2 mt-2">{strikes}</h2>
                    </div>

                </div>
            </div>
            <div className="d-flex row-flex my-3">
                <button 
                    className="btn btn-block btn-primary btn-info"
                    onClick={(e) => {
                        try{
                            e.preventDefault();

                            function check(){
                                const GetUserData = async () => {
                                    const { data } = await axios.get(`https://backend-production-6d58.up.railway.app/api/users/${idUser}`);
                                        if (data.username === undefined){
                                            e.preventDefault();
                                            return alert('El usuario no existe');
                                        }else{
                                            axios.put(`https://backend-production-6d58.up.railway.app/api/users/ban/${idUser}`)
                                            alert('El usuario ha sido banneado');
                                            window.location.reload();
                                        }
                                };
                                GetUserData();
                            }
                            check();
                        }catch(error){
                            e.preventDefault();
                            console.log(error);
                        }
                    }}
                    >BANNEAR DE LA PLATAFORMA</button>
            </div>
        </div>
      </div>  
    );
}
{/* <p className="mt-2">Fecha de ingreso a la plataforma:</p>
                    <div id="cargarFechaIngreso" className="my-1">{}</div> */}
export default BanUsuario;