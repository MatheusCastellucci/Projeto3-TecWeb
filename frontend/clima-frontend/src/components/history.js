import React, { useState, useEffect } from 'react';
import { fetchSearchHistory } from './historyAPI';

function History() {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    fetchSearchHistory()
      .then((history) => {
        setSearchHistory(history);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {searchHistory.map((item, index) => (
          <li key={index}>{item.city} - {item.forecast}</li>
        ))}
      </ul>
    </div>
  );
}

export default History;
