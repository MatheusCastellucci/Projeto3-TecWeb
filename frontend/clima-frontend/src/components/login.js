import React, { useState } from 'react';
import '../App.css';
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
      window.location.replace("/home");
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

const styles = {
  input: {
    backgroundColor: "#fff",
    padding: 10,
    width: "80%",
    marginTop: 15,
    color: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFC0CB",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    width: "30%",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: "#000",
  },
  resultado: {
    fontSize: 30,
    color: "#fff",
    marginTop: 15,
  },
};