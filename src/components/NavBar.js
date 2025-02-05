import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css"; // Import the CSS file

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">NewsApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link animated-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link animated-link" to="/business">Business</Link></li>
            <li className="nav-item"><Link className="nav-link animated-link" to="/entertainment">Entertainment</Link></li>
            <li className="nav-item"><Link className="nav-link animated-link" to="/health">Health</Link></li>
            <li className="nav-item"><Link className="nav-link animated-link" to="/science">Science</Link></li>
            <li className="nav-item"><Link className="nav-link animated-link" to="/sports">Sports</Link></li>
            <li className="nav-item"><Link className="nav-link animated-link" to="/technology">Technology</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
