import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './header.css';

const Header = (props) => {

    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem('auth-token');
      navigate('/login');
    }

    return (
        <header id="header" className="fixed-top header-inner-pages">
          <div className="container d-flex align-items-center justify-content-between">
            <h1 className="logo fw-bold"><Link to="/app/home">Movie Manager</Link></h1>
      
            <nav id="navbar" className="navbar">
              <ul>
                <li><Link to="/app/home" className="nav-link scrollto">Home</Link></li>
                <li>
                  <a href="#" className="nav-link scrollto" onClick={logout} >Logout</a>
                </li>
                {/* <li className="dropdown"><a><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
                  <ul>
                    <li><a>Drop Down 1</a></li>
                    <li className="dropdown"><a><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                      <ul>
                        <li><a>Deep Drop Down 1</a></li>
                        <li><a>Deep Drop Down 2</a></li>
                        <li><a>Deep Drop Down 3</a></li>
                        <li><a>Deep Drop Down 4</a></li>
                        <li><a>Deep Drop Down 5</a></li>
                      </ul>
                    </li>
                    <li><a>Drop Down 2</a></li>
                    <li><a>Drop Down 3</a></li>
                    <li><a>Drop Down 4</a></li>
                  </ul>
                </li> */}
                {/* <li><a className="nav-link scrollto" href="#contact">Contact</a></li> */}
                {/* <li><a className="getstarted scrollto" href="#about">Get Started</a></li> */}
              </ul>
              <i className="bi bi-list mobile-nav-toggle"></i>
            </nav>
      
          </div>
        </header>
    );
}

export default Header;