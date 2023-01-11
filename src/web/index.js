/* Heroku entrypoint */

const express = require('express');
const request = require('request');

const PORT = process.env.PORT || 3000;

const app = express();

const db = require('../db');

app.get('/', async (req, res) => {
    const users = await db.lights();

    console.log(users);

    res.send(users);
});

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
