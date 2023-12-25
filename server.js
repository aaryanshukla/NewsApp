const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

const conservativeSources = 'fox-news,breitbart-news,the-wall-street-journal';
const liberalSources = 'cnn,msnbc,the-huffington-post';

app.get('/news', async (req, res) => {
  const { bias, ...otherParams } = req.query;
  let sources = '';

  if (bias === 'conservative') {
    sources = conservativeSources;
  } else if (bias === 'liberal') {
    sources = liberalSources;
  }

  // Construct the API URL with all the query parameters
  let apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.NEWS_API_KEY}`;
  apiUrl += sources ? `&sources=${sources}` : '';

  // Add other query parameters
  for (const param in otherParams) {
    apiUrl += `&${param}=${encodeURIComponent(otherParams[param])}`;
  }

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).send('Error fetching news');
  }
});

  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
