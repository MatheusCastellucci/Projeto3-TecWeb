import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login.css';
import axios from 'axios';

const SignUpScreen = () => {
  const [username, setUsernameSignUp] = useState('');
  const [password, setPasswordSignUp] = useState('');
  const [email, setEmailSignUp] = useState('');
  
  const navigate = useNavigate();

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

  const goBack = () => {
    navigate('/');
  };

  function signUP() {
    axios.post('http://localhost:8000/api/users/', {
      username: username,
      password: password,
      email: email,
    }).then(function (response) {
      console.log(response.data);
      window.location.replace("/");
    }).catch(function (error) {
      console.log(error);
    });

  }

  return (
    <div>
      <video className="BackgroundVideo" autoPlay loop>
        <source src={require('./videos/sunrise.mp4')} type="video/mp4" />
      </video>
      <div className="FormContainer">
        <img src={require('./images/logo.png')} alt="Logo" className="Logo" />
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome de Usuário"
          onChange={usernameHandler}
          value={username}
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={passwordHandler}
          value={password}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={emailHandler}
          value={email}
        />

        <button type="submit">
          Sign Up
          </button>

        <button className="Cadastrar" type="button" onClick={goBack}>
          Já tenho conta
        </button>
      </form>
      </div>

    </div>
  );
};

export default SignUpScreen;
