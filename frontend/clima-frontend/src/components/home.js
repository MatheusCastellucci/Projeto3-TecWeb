import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import LoginScreen from './login';

const key = '34f0af7fd6mshe15209f9c13f7b1p140635jsn0806aa4219eb';

function Home() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [forecast, setForecast] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
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

    try {
      axios.request(options).then(function (response) {
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
          setForecast(response.data.current.temperature);
          
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
            });
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleHistoricoClick = () => {
    if (localStorage.getItem("token") === null) {
      navigate('/')
    }
    else{
      navigate('/historico');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          placeholder="Cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handleSearch}>
          Buscar
        </button>
        <p style={styles.resultado}>{forecast}</p>
        <button style={styles.button} onClick={handleLogout}>
          Logout
        </button>
        <button style={styles.button} onClick={handleHistoricoClick}>
          Historico
        </button>
      </header>
    </div>
  );
}

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
    backgroundColor: "black",
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

export default Home;
