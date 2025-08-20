
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:5175',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Add a logger for all requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.get('/dog', async (req, res) => {
    try {
        const breed = req.query.breed;
        let url = 'https://dog.ceo/api/breeds/image/random';
        if (breed) {
            url = `https://dog.ceo/api/breed/${breed}/images/random`;
        }
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch dog image' });
    }
});

const server = app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});
