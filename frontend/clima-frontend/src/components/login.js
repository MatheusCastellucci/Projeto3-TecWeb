import React, { useState } from 'react';
import '../Login.css';
import axios from 'axios';
import rainy from './videos/rainy.mp4';
import logo from './images/logo.png';

function LoginScreen({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const handleRegister = () => {
    window.location.replace("/signup");
  };

  function login() {
    axios.post('http://localhost:8000/api/token/', {
      "username": username,
      "password": password,
    })
      .then(function (response) {
        console.log(response.data);
        window.location.replace("/home");
      });
  }

  return (
    <div className='Login'>
      <video className="BackgroundVideo" autoPlay muted loop>
        <source src={rainy} type="video/mp4" />
      </video>
      <div className="FormContainer">
        <img src={logo} alt="Logo" className="Logo" />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome de Usuário" onChange={usernameHandler} value={username} />
          <input type="password" placeholder="Senha" onChange={passwordHandler} value={password} />
          <div className="ButtonContainer">
            <button className='Logar' type="submit">Login</button>
            <button className='Cadastrar' type="button" onClick={handleRegister}>Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
