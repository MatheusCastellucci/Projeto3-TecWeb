import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import LoginScreen from './components/login';
import SignUpScreen from './components/signup';
import Home from './components/home';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
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

// Componente para a tela de login
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
    console.log(response.data.data.token);
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

// Componente principal
function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [forecast, setForecast] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleLogin = (username, password) => {
    // Lógica para enviar as credenciais de login para o backend do Django
    // ...
    // Após a autenticação bem-sucedida, você pode definir o estado isLoggedIn como true
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Lógica para realizar logout
    // ...
    // Após o logout, você pode definir o estado isLoggedIn como false
    setIsLoggedIn(false);
  };

  const handleSearch = () => {
    const options = {
      method: 'GET',
      url: 'https://foreca-weather.p.rapidapi.com/location/search/' + city,
      params: {
        lang: 'en',
        country: country
      },
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
      }
    };

    try {
      axios.request(options).then(function (response) {
        const ID = response.data.locations[0].id;
        
        const getDataOptions = {
          method: 'GET',
          url: 'https://foreca-weather.p.rapidapi.com/current/' + ID,
          params: {
            lang: 'en',
          },
          headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
          }
        };

        axios.request(getDataOptions).then(function (response) {
          console.log(response.data.current);
          setForecast(response.data.current.temperature);
        });
      });
    } catch (error) {
      console.error(error);
    }
      const searchItem = {
    city,
    country,
    forecast
  };
  setSearchHistory((prevHistory) => [...prevHistory, searchItem]);
};

  return (
    <div className="App">
      <header className="App-header">

        {!isLoggedIn ? (
          <LoginScreen handleLogin={handleLogin} />
        ) : (
          <>
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={styles.input}
            />
            <input
              placeholder="País"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={styles.input}
            />
            <button style={styles.button} onClick={handleSearch}>
              Buscar
            </button>
            <p style={styles.resultado}>{forecast}</p>
            <button style={styles.button} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

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