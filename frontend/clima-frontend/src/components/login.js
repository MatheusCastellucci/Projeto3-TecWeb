import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

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
  
    function login() {
      axios.post('http://localhost:8000/api/token/', {
        "username": username,
        "password": password,
    })
    .then(function (response) {
      console.log(response.data);
    })
    }
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome de Usuário" onChange={usernameHandler} value={username}/>
  
          <input type="password" placeholder="Senha" onChange={passwordHandler} value={password}/>
          
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

export default LoginScreen;