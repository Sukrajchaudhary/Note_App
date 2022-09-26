import React from 'react'
import { Link, useLocation ,useNavigate} from "react-router-dom"

export const Navbar = (props) => {
    let location = useLocation();
    React.useEffect(() => {
    }, [location]);
let navigate=useNavigate();
const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/Login');
}
    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} `}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">INotesBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                 <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} display:'none'`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link disabled" to="" tabindex="-1" aria-disabled="true">Disabled</Link>
                            </li> */}
                        </ul>
                        <button className='btn btn-success btn-sm mx-2 my-3' onClick={props.toggleMode} >{props.text}</button>
                        {!localStorage.getItem('token')? <form className="d-flex">
                            <Link className="btn btn-success mx-2 btn-sm" to="/Login" role="button">LOGIN</Link>
                            <Link className="btn btn-success mx-2 btn-sm" to="/SignUp" role="button">SIGNUP</Link>
                        </form>:<button  onClick={handleLogout} className="btn btn-danger btn-sm">LogOut</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}
