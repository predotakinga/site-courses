import React from "react";
import "./Page404.css";
import logo from "../../assets/logo.png";

export default function Page404() {
  return (
    <>
      <div className="nav">
        <a href="/" className="home">
          <img src={logo} />
        </a>
      </div>
      <div className="outlet">
        <h1>404</h1>
        <p>Niestety strona o podanym adresie nie istnieje.</p>
      </div>
    </>
  );
}
