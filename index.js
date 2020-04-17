const express = require('express');
const request = require('request');

const fs = require('fs');
const doAsync = require('doasync');
const moment = require('moment');

const {
    findDateStrings,
    hasDate,
    findColorStrings,
    findTodaysString
} = require('./app/find-date-strings.js');

const LIGHTS_URL = 'https://sfgov.org/cityhall/lighting';
const LIGHTS_HEADING = `This Month's Lighting Events`;


const mockData = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile('output.html', function (err, data) {
            if (err)
                throw err;
        
            if (data) {
                resolve(data);
            }
        });
    });
}

const getData = async () => {
    return new Promise((resolve, reject) => {
        request(LIGHTS_URL, (err, res, body) => {
            if (err) { return console.log(err); }
    
            resolve(body);
        });
    });
};

const parseData = (data) => {

    let dateStrings = findDateStrings(data);
    let colorStrings = findColorStrings(dateStrings);
    let todaysString = findTodaysString(colorStrings);
    let output = '';
    
    if (!todaysString.text) {
        output = "Sorry, I can’t find information about today on SFGov.org.";
        return;
    }

    output = "Today is " + moment().format('LL') + '. ';
    output += 'The color of city hall is ' + todaysString.text;

    return output;    
};

// (async () => {
//     try {
//         const data = await mockData();
//         const output = parseData(data);

//         console.log(output);
//     } catch(e) {};

// })();

const app = express();
const port = 80;

app.get('/', async (req, res) => {
    const data = await mockData();
    const output = parseData(data);

    res.send(output);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
