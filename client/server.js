require('dotenv').config({ path: '../.env' });
const express = require('express');
const fetchMemes = require('./fetchMemes');
const app = express();

app.get('/api/memes', async (req, res) => {

    const memes = await fetchMemes(100);
    res.json(memes.sort(() => Math.random() - 0.5));

});

const port = 300;

app.listen(port, () => console.log(`Server running on port ${port} | Subreddits: ${process.env.SUBREDDITS}`));