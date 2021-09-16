import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">React App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {props.user !== null &&
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">My Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/forum">Forum</Link>
                </li>
              </>
            }
          </ul>
          <ul className="navbar-nav">
            {props.user === null ?
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">Welcome, {props.user.username}</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={props.logoutUser}>Logout</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
