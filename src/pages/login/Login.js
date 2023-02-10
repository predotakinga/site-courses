import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const data = {
    username: username,
    password: password,
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    authoriseUser();
  };

  const saveToken = (value) => {
    try {
      localStorage.setItem("token", JSON.stringify(value));
    } catch (err) {
      console.log(err);
    }
  };

  const authoriseUser = () => {
    try {
      axios
        .post(`http://${process.env.REACT_APP_MYHOST}/login`, data)
        .then((res) => {
          saveToken(res.data);
          window.location.reload(false);
          return navigate("/");
        })
        .catch((error) => {
          setError("Wprowadzone dane są nieprawidłowe");
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={submitHandler}>
          <img src={logo} alt="Logo" className="logo-img" />
          <div className="form-inner">
            {error !== "" ? <div className="error">{error}</div> : ""}
            <div className="form-group">
              <input
                type="text"
                placeholder="Nazwa użytkownika"
                onChange={handleUsernameChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Hasło"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
            <input
              type="submit"
              value="Zaloguj"
              className="login-button"
            ></input>
          </div>
        </form>
      </div>
    </>
  );
}
