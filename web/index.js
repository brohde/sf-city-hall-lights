/* Heroku entrypoint */

const express = require('express');
const request = require('request');

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', async (req, res) => {
    const output = "testing";

    console.log('hello!');

    res.send(output);
});

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
