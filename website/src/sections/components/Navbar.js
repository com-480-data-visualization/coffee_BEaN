import React, {useState} from 'react';
import {Link} from "react-scroll";
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/website/public" className="navbar-logo">
          {"Coffee BEaN"}
        </a>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="hero" className="nav-links" onClick={closeMobileMenu}
                  smooth={true} spy={true} offset={-100} duration={500}>
              {"Homepage"}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="graph" className="nav-links" onClick={closeMobileMenu}
                  smooth={true} spy={true} offset={-80} duration={500}>
              {"Graph 1"}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="graph2" className="nav-links" onClick={closeMobileMenu}
                  smooth={true} spy={true} offset={-80} duration={500}>
              {"Graph 2"}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="footer" className="nav-links" onClick={closeMobileMenu}
                  smooth={true} spy={true} offset={-100} duration={500}>
              {"Creators"}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;