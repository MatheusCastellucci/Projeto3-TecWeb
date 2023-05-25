import React, { useState } from 'react';
import './App.css';
import axios from 'axios';


const SignUpScreen = () => {
    const [username, setUsernameSignUp] = useState("");
    const [password, setPasswordSignUp] = useState("");
    const [email, setEmailSignUp] = useState("");
  
    const usernameHandler = (e) => {
      setUsernameSignUp(e.target.value);
    };
  
    const passwordHandler = (e) => {
      setPasswordSignUp(e.target.value);
    };
  
    const emailHandler = (e) => {
      setEmailSignUp(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      signUP();
    };
  
    function signUP() {
      axios.post('http://localhost:8000/api/users/', {
        "username": username,
        "password": password,
        "email": email
      })}
  
    return (
      <div>
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome de Usuário" onChange={usernameHandler} value={username}/>
  
          <input type="password" placeholder="Senha" onChange={passwordHandler} value={password}/>
  
          <input type="email" placeholder="Email" onChange={emailHandler} value={email}/>
  
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }

export default SignUpScreen;
  