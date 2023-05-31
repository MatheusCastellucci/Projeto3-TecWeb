import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home.css';
import axios from 'axios';
import earth from './videos/fundo terra.mp4';
import logo from './images/logo.png';

const key = '34f0af7fd6mshe15209f9c13f7b1p140635jsn0806aa4219eb';

function Home() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [forecast, setForecast] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // New state variable
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem('token'))}`
      }
    };

    axios.get('http://localhost:8000/api/notes/', config)
      .then(function (response) {
        setSearchHistory(response.data);
        console.log(localStorage.getItem('token'))
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleLogin = (username, password) => {
    // Perform authentication logic here, such as sending login credentials to the backend
    axios
      .post('http://localhost:8000/api/login', {
        username,
        password,
      })
      .then(function (response) {
        // If authentication is successful, set the isLoggedIn state to true
        setIsLoggedIn(true);
      })
      .catch(function (error) {
        // If authentication fails, handle the error
        console.error(error);
      });
  };

  const handleLogout = () => {
    // Logout logic here
    setIsLoggedIn(false);
    localStorage.removeItem('token')
    navigate('/');
  };

  const handleSearch = () => {
    setErrorMessage("");
    const options = {
      method: 'GET',
      url: 'https://foreca-weather.p.rapidapi.com/location/search/' + city,
      params: {
        lang: 'en',
      },
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      if (response.data.locations.length === 0) {
        setErrorMessage('Error. Please check the city name.');
        return;
      }

      const ID = response.data.locations[0].id;
      const city = response.data.locations[0].name;

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
        setForecast(response.data.current.temperature + '°C');
        
        const data = {
          'cidade': city,
        }
        const header = {
          headers: {
            'Authorization': `Token ${JSON.parse(localStorage.getItem('token'))}`
          }
        };

        axios.post('http://localhost:8000/api/notes/', data, header)
          .then(function (response) {
            console.log('Search history saved successfully!');
          })
          .catch(function (error) {
            console.error(error);
            setErrorMessage('Error. Verifique se o nome da cidade está correto');
          });
      });
    }).catch(function (error) {
      console.error(error);
      setErrorMessage('Error. Failed to fetch data');
    });
  };

  const handleHistoricoClick = () => {
    if (localStorage.getItem("token") === null) {
      navigate('/')
    }
    else {
      navigate('/historico');
    }
  };

  return (
    <div className="App">
      <video className='BgV' autoPlay muted loop>
        <source src={earth} type='video/mp4' />
      </video>
      <div className='logo'>
        <img src={logo} alt='logo' />
      </div>
      <div className='FormContainer'>
        <input
          placeholder="Cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className='input'
        />
        {errorMessage && <p className='error'>{errorMessage}</p>}
        <p className='resultado'>{forecast}</p>
        <div className='ButtonContainer'>
        <button onClick={handleSearch}>
          Buscar
        </button>
        <button onClick={handleHistoricoClick}>
          Historico
        </button>
        <button onClick={handleLogout}>
          Logout
        </button>

        </div>
        </div>
    </div>
  );
}

export default Home;
