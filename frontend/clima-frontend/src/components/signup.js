import React, { useState } from 'react';
import '../App.css';
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
  