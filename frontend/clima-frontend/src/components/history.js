import React, { useState, useEffect } from 'react';
import { fetchSearchHistory, handleSearch, deleteSearchHistoryItem } from './historyAPI';
import { useNavigate } from 'react-router-dom';
import '../History.css';

function History() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [forecasts, setForecasts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchSearchHistory()
      .then((history) => {
        setSearchHistory(history);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleForecastClick = async (city) => {
    try {
      const forecast = await handleSearch(city);
      console.log(forecast);
      setForecasts((prevForecasts) => ({
        ...prevForecasts,
        [city]: forecast,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async (noteId, city) => {
    try {
      await deleteSearchHistoryItem(noteId);
      setSearchHistory((prevSearchHistory) =>
        prevSearchHistory.filter((item) => item.cidade !== city)
      );
      setForecasts((prevForecasts) => {
        const updatedForecasts = { ...prevForecasts };
        delete updatedForecasts[city];
        return updatedForecasts;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const goBack = () => {
    navigate('/home');
  };

  return (
    <div className="container">
      <h2>Histórico</h2>
      <ul>
        {searchHistory.map((item, index) => (
          <li key={index}>
            {item.cidade} - {forecasts[item.cidade]}
            <button onClick={() => handleForecastClick(item.cidade)} style={{ marginLeft: '1rem' }}>
              Temperatura
            </button>
            <button onClick={() => handleDeleteClick(item.id, item.cidade)} style={{ marginLeft: '1rem' }}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
      <button onClick={goBack}>Voltar</button>
    </div>

  );
}

export default History;
