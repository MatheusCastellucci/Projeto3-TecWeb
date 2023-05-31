import React, { useState, useEffect } from 'react';
import { fetchSearchHistory, handleSearch, deleteSearchHistoryItem } from './historyAPI';

function History() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [forecasts, setForecasts] = useState({});

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

  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {searchHistory.map((item, index) => (
          <li key={index}>
            {item.cidade} - {forecasts[item.cidade]}
            <button onClick={() => handleForecastClick(item.cidade)} style={{ marginLeft: '1rem' }}>
              Get Forecast
            </button>
            <button onClick={() => handleDeleteClick(item.id, item.cidade)} style={{ marginLeft: '1rem' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
