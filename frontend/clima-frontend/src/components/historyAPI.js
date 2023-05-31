import axios from 'axios';
import { useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8000/api';
const key = '34f0af7fd6mshe15209f9c13f7b1p140635jsn0806aa4219eb';

export const fetchSearchHistory = async () => {
    const config = {
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem('token'))}`
        }
      };
  try {
    const response = await axios.get(`${API_BASE_URL}/notes/`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleSearch = async (city) => {
  const options = {
    method: 'GET',
    url: 'https://foreca-weather.p.rapidapi.com/location/search/' + city,
    params: {
      lang: 'en',
    },
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const ID = response.data.locations[0].id;

    const getDataOptions = {
      method: 'GET',
      url: 'https://foreca-weather.p.rapidapi.com/current/' + ID,
      params: {
        lang: 'en',
      },
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com',
      },
    };

    const getDataResponse = await axios.request(getDataOptions);
    const forecast = getDataResponse.data.current.temperature + 'ºC';

    console.log(forecast);
    return forecast;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteSearchHistoryItem = async (noteId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/notes/` + noteId + `/`);
    return response.data; // Assuming the API returns the response data after deletion
  } catch (error) {
    console.error(error);
    throw error;
  }
};
