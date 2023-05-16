const axios = require('axios');

function getData(id){
    const options = {
        method: 'GET',
        url: 'https://foreca-weather.p.rapidapi.com/current/'+id,
        params: {
          lang: 'en',
        },
        headers: {
          'X-RapidAPI-Key': '34f0af7fd6mshe15209f9c13f7b1p140635jsn0806aa4219eb',
          'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
      };
    try {
        axios.request(options).then(function (response) {
            //console.log(response.data);
            console.log(response.data.current);
        }
    )} catch (error) {
        console.error(error);
    }
}


function getID(name, country){
    const options = {
        method: 'GET',
        url: 'https://foreca-weather.p.rapidapi.com/location/search/'+name,
        params: {
          lang: 'en',
          country: country
        },
        headers: {
          'X-RapidAPI-Key': '34f0af7fd6mshe15209f9c13f7b1p140635jsn0806aa4219eb',
          'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
      };
    try {
        axios.request(options).then(function (response) {
            //console.log(response.data);
            id = response.data.locations[0].id;
            teste = getData(id);
            //console.log(teste);
            
        }
    )} catch (error) {
        console.error(error);
    }
}

getID('Sao Paulo', 'br');