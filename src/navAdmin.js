import React, { Component } from 'react';
import images from './assests/images';
import { Link } from 'react-router-dom';
import '../src/assests/styles/navbar.css';
import '../src/assests/styles/gameflex.css';
import '../src/assests/styles/registro.css';


class navAdmin extends Component {
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <Link to='/' href="index.html" className="navbar-brand">
                        <span>
                            <img id="game_icon" src={images.gp3} alt="..." />
                            Game_Topic
                        </span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>               
                    </button>
                    <div className="collapse navbar-collapse" id="menu">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active"><Link to='/' className="nav-link">Inicio</Link></li>
                            <li className="nav-item "><Link to='/Biblioteca' className="nav-link">Biblioteca</Link></li>
                            <li className="nav-item "><Link to='/registroActividad' className="nav-link">Registro de Actividades</Link></li>
                            <li className='nav-item'><Link to='/adminOption' className='nav-link'>Administrar</Link></li>
                            <li className='nav-item'>
                            <a href='https://github.com/PichiGod/gametopic-pichi.git' className='nav-link' target="_blank" rel="noopener noreferrer">Respaldo</a>
                            </li>
                          
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li><p className="nav-link">
                                <span 
                                    className="d-inline-block" 
                                    tabindex="0" 
                                    data-toggle="tooltip" 
                                    title="Iniciar Sesión">
                                    <span 
                                        className="material-symbols-outlined" 
                                        id="login-icon" 
                                        data-toggle="modal" 
                                        data-target="#myModal">
                                            login
                                    </span> 
                                    <span 
                                        className="d-inline-block" 
                                        tabindex="0" 
                                        data-toggle="tooltip" 
                                        title="Disabled tooltip">
                                    </span>
                                </span>
                            </p></li>
                        </ul>
                    </div>
                </div>
            </nav>
        ) 
    }   
}

export default navAdmin;