import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import LoginScreen from './components/login';
import SignUpScreen from './components/signup';

const key = '34f0af7fd6mshe15209f9c13f7b1p140635jsn0806aa4219eb';


function Home() {
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

export default Home;