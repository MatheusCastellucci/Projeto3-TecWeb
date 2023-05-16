import React, { useState } from 'react';
import './App.css';
import axios from 'axios'

const key = '34f0af7fd6mshe15209f9c13f7b1p140635jsn0806aa4219eb';

function getData(id, setForecast) {
  const options = {
    method: 'GET',
    url: 'https://foreca-weather.p.rapidapi.com/current/' + id,
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
      console.log(response.data.current);
      setForecast(response.data.current.temperature);
    });
  } catch (error) {
    console.error(error);
  }
}

function getID(name, country, setForecast) {
  const options = {
    method: 'GET',
    url: 'https://foreca-weather.p.rapidapi.com/location/search/' + name,
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
      getData(ID, setForecast);
    });
  } catch (error) {
    console.error(error);
  }
}

function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [forecast, setForecast] = useState("");

  return (
    <div className="App">
      <header className="App-header">
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

        <button style={styles.button} onClick={() => getID(city, country, setForecast)}>Buscar</button>
          
        <p style={styles.resultado}>{forecast}</p>
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
  input: {
      backgroundColor: "#fff",
      padding: 10,
      width: "80%",
      marginTop: 15,
      color: "#000",
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