// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


// Endpoint to fetch arrival info
app.get('/api/arrival-info', async (req, res) => {
  const instance = axios.create();
  instance.defaults.headers.common["X-Authentication-Key"] ="ab6252387800c3f8f635786080854a7ed6da9f4b1fcdb761e24909359a8868c1";
try {

   // Get the current time
   const currentTime = new Date();

   // Set the fromDatetime to the current time in the specified format
   //const fromDatetime = currentTime.toISOString().replace(/[-:]/g, "").replace(/\..+/, '');

   // Calculate the toDatetime by adding 24 hours to fromDatetime
   //const toDatetime = new Date(currentTime.getTime() + (12 * 60 * 60 * 1000)).toISOString().replace(/[-:]/g, "").replace(/\..+/, '');
  
   const response = await instance.post('http://10.31.40.11:8085/standapi/arrmovementinfo', {
    fromDatetime: "202402022000",
    toDatetime: "202402022900"

    // fromDatetime,
    // toDatetime
  },
  axios
  );

  // Process the response and send relevant data to the app
  const arrivalInfo = response.data;
  res.json(arrivalInfo);
  console.log(arrivalInfo)
} catch (error) {
  console.error('Error fetching arrival info:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

// Endpoint to fetch departure info
app.get('/api/departure-info', async (req, res) => {
    const instance = axios.create();
    instance.defaults.headers.common["X-Authentication-Key"] ="ab6252387800c3f8f635786080854a7ed6da9f4b1fcdb761e24909359a8868c1";
  try {

    // Get the current time
   const currentTime = new Date();

   // Set the fromDatetime to the current time in the specified format
   //const fromDatetime = currentTime.toISOString().replace(/[-:]/g, "").replace(/\..+/, '');

   // Calculate the toDatetime by adding 24 hours to fromDatetime
   //const toDatetime = new Date(currentTime.getTime() + (12 * 60 * 60 * 1000)).toISOString().replace(/[-:]/g, "").replace(/\..+/, '');
  

    const response = await instance.post('http://10.31.40.11:8085/standapi/depmovementinfo', {
      fromDatetime: "202402020100",
    toDatetime: "202402020900"

    //   fromDatetime,
    //   toDatetime
    },
    axios
    );

    // Process the response and send relevant data to the app
    const departureInfo = response.data;
    res.json(departureInfo);
    console.log(departureInfo)
  } catch (error) {
    console.error('Error fetching departure info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start ngrok tunnel
// const ngrok = require('ngrok');
// (async function() {
//   const url = await ngrok.connect(PORT);
//   console.log(`Ngrok tunnel is active at ${url}`);
// })();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/api/data', (req, res) => {
    res.json({res });
  });
