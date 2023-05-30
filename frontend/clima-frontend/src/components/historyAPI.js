import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

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
