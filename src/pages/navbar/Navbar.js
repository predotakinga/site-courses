import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import axios from "axios";

export default function Navbar() {
  const [userData, setUserData] = useState([]);
  return (
    <nav className="nav">
      <ul>
        <li>
          <a href="/" className="home">
            <img src={logo} />
          </a>
        </li>
        <li>
          <a href="/" className="home">
            Strona główna
          </a>
        </li>
        <li>
          <a href="/mojekursy">Moje kursy</a>
        </li>
      </ul>
      <ul>
        <li
          onClick={() => {
            axios
              .post(`http://localhost:3001/logout`)
              .then((res) => {
                setUserData(res.data);
                console.log(res.data);
              })
              .catch((error) => console.log(error));
            localStorage.removeItem("token");
            window.location.reload(false);
          }}
          className="logbtn"
        >
          Wyloguj
        </li>
      </ul>
    </nav>
  );
}
