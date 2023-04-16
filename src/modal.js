import axios from "axios";
import { Collapse } from "bootstrap";
import React, { useEffect, useState } from "react";
import { CloseButton } from "react-bootstrap";
import { Link, Navigate, redirect, useNavigate, useRouteLoaderData } from "react-router-dom";
import "../src/assests/styles/navbar.css";

/*function modalForm(){
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password:''
        }
    }
    alCambioEmail(email){
        this.setState({
            email: email
        });
    }
    alCambioPassword(password){
        this.setState({
            password: password
        });
    }
    alSubmit(){
        const navigate = useNavigate();
        console.log(this.state);
        if(this.state.email === 'admin' && this.state.password === 'admin'){
            navigate('/adminStart');
        }
        else{
            console.log('No eres admin')
        }
    }
}*/

let InicioSesion = [
  {
    "correo": "",
    "intentos": 0,
    "bloqueo": false
  },
  {
    "correo": "",
    "intentos": 0,
    "bloqueo": false
  }
]

let usuario= {
  "correo": "",
  "intentos": 0,
  "bloqueo": false
}

let CorreosBloqueados=[]


function Modal() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Success, setSucess] = useState(false);
  const admin = [{ email: "admin@gmail.com", password: "admin" }];

  function esAdmin() {
    const account = admin.find((user) => user.email === email);
    if (account && account.password === password) {
      return true;
    } else {
      return false;
    }
  }

  function ShowPassword() {
    var tipo = document.getElementById("form2Example2");
    if (tipo.type == "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }
  }

  const checkUser = async () => {
    const res = await axios.get("/api/users/getAllUsers", {
      responseType: "json",
    });
    const match = res["data"].find((element) => {
      return element.correo.toLowerCase() === email.toLowerCase();
    });
    if (match) {
      console.log("Found User!");
      if (match.password === password) {
        if(InicioSesion.find(usuario => usuario.correo === email)) {
          usuario = InicioSesion.find(usuario => usuario.correo === email);
          console.log("el correo ingresado se encuentra en el listado iniciosesion")
          console.log(InicioSesion);
          if(usuario.bloqueo === true) {
            window.alert("Cuenta bloqueada, diríjase a la sección: recuperar contraseña para desbloquear")
            console.log("La cuenta ingresada se encuentra bloqueada")
            return false;
          }else{
            usuario.intentos = 0;
            console.log("inicio satisfactorio1");
            console.log(usuario);
            localStorage.setItem("idusuario", match.idusuario);
            localStorage.setItem("role", match.rol);
            window.location.reload();
            return true;
           
          }

        }else{
          console.log("inicio satisfactorio2");
          console.log(usuario);
          localStorage.setItem("idusuario", match.idusuario);
          localStorage.setItem("role", match.rol);
          window.location.reload();
          return true;
          
        }

      } else {
        console.log("Wrong Password!");
       
        /*Verificaciones para validar intentos fallidos */
        if(InicioSesion.find(usuario => usuario.correo === email)) {
          let usuario = InicioSesion.find(usuario => usuario.correo === email);
          if(usuario.intentos=== 1) {
            usuario.intentos=2;
            console.log("intentos fallidos: 2/3")
            console.log(usuario);
            window.alert("Clave ingresada incorrecta. Un intento fallido más y bloqueará su cuenta")
          } else if(usuario.intentos ===2) {
            usuario.intentos=3;
            usuario.bloqueo=true;
            CorreosBloqueados.push(usuario.correo);
            localStorage.setItem("correosbloqueados", CorreosBloqueados);
            console.log("estos son los correos bloqueados: "+CorreosBloqueados)

            console.log("Tu cuenta ha sido bloqueada");
            console.log(usuario);
            window.alert("Su cuenta ha sido bloqueada, diríjase a la sección: recuperar contraseña para desbloquear");
          } else if (usuario.bloqueo === true) {
            console.log("Esta cuenta se encuentra bloqueada");
            console.log("Ir al menú recuperar contraseña para desbloquear");
            window.alert("Cuenta bloqueada, diríjase a la sección: recuperar contraseña para desbloquear");
            console.log(InicioSesion)
          }
        }else{
          usuario= {
            "correo": email,
            "intentos": 1,
            "bloqueo": false
          }
          InicioSesion.push(usuario);
          console.log(usuario);
          window.alert("Clave ingresada incorrecta");
        }



        return false;
      }
    } else {
      console.log("User wasn't found!");
      return false;
    }
    console.log("ROL DE SESIÓN: ", localStorage.getItem("role"));
    console.log("ID DE SESIÓN: ", localStorage.getItem("id_usuario"));
  };

  const alSubmit = async (ev) => {
    ev.preventDefault();
    let result = await checkUser();
    if (result) {
      console.log("Sesión Iniciada");
      <Navigate to="/Biblioteca" />;
    } else {
      console.log("Sesión Fallida");
      ev.preventDefault();
    }
  };

  return (
    <div className="modal" id="myModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title col-11 text-center">Iniciar Sesión</h5>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div className="d-flex flex-column text-center">
            <form onSubmit={alSubmit}>
              <label className="form-label" for="form2Example1">
                Correo de Usuario
              </label>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form2Example1"
                  name="email"
                  className="form-control pl-2"
                  onChange={(ev) => setEmail(ev.target.value)}
                  value={email}
                  required
                />
              </div>

              <label className="form-label" for="form2Example2">
                Contraseña
              </label>
              <div className="form-outline mb4">
                <input
                  type="password"
                  id="form2Example2"
                  className="form-control pl-2"
                  name="password"
                  maxLength="16"
                  onChange={(ev) => setPassword(ev.target.value)}
                  value={password}
                  required
                />
                <input
                  type="button"
                  name="wf"
                  className="botonMostrarPassw"
                  onClick={ShowPassword}
                  value="Mostrar Contraseña"
                />
              </div>

              <button
                className="btn btn-info btn-lg btn-block"
                type="submit"
                id="login-btn"
              >
                Ingresar
              </button>
            </form>
          </div>

          <div className="modal-footer modal-footer-centered">
            <a href="/Recuperacion">¿Olvidaste tu contraseña?</a>

            <a href="/Registro">¿No tienes una cuenta? Regístrate aquí</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

/*class modal extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password:''
        }
    }
    alCambioEmail(email){
        this.setState({
            email: email
        });
    }
    alCambioPassword(password){
        this.setState({
            password: password
        });
    }
    alSubmit(){
        console.log(this.state);
        if(this.state.email === 'admin@gmail.com' && this.state.password === 'admin'){
            return <Navigate to="/adminStart" />;
        }
        else{
            console.log('No eres admin')
        }
    }
    

    render(){
        return(
            <div className='modal' id='myModal'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        
                        <div className='modal-header'>
                            <h5 className='modal-title col-11 text-center'>Iniciar Sesión</h5>
                            <button type='button' className='close' data-dismiss='modal'>&times;</button>
                        </div>

                        <div className='d-flex flex-column text-center'>
                            <form >

                                <div className='form-outline mb-4'>
                                    <input 
                                        type='email' 
                                        id='form2Example1' 
                                        name='email' 
                                        className='form-control pl-2' 
                                        onChange={(ev) => {this.alCambioEmail(ev.target.value)}}
                                        value={this.state.email}
                                    />
                                    <label 
                                        className='form-label' 
                                        for='form2Example1'
                                        >
                                            Nombre de Usuario
                                    </label>
                                </div>

                                <div className='form-outline mb4'>
                                    <input 
                                        type="password" 
                                        id="form2Example2" 
                                        className="form-control pl-2" 
                                        name='password'
                                        onChange={(ev) => {this.alCambioPassword(ev.target.value)}}
                                        value={this.state.password}
                                    />
                                    <label 
                                        className="form-label" 
                                        for="form2Example2"
                                        >
                                            Contraseña
                                    </label>
                                </div>

                                <button 
                                    className="btn btn-info btn-lg btn-block" 
                                    type="submit" 
                                    onClick={(e) => {e.preventDefault(); this.alSubmit()} } 
                                    id="login-btn" >
                                        Ingresar
                                </button>

                            </form>
                        </div>

                        <div className='modal-footer modal-footer-centered'>
                            <p>¿Olvidaste tu contraseña?</p>
                            <Link to='/registro'>¿No tienes una cuenta? Regístrate aquí</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default modal;*/
