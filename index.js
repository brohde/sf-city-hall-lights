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




fs.readFile('output.html', function (err, data) {
    if (err)
        throw err;

    if (data) {
        let dateStrings = findDateStrings(data);
        let colorStrings = findColorStrings(dateStrings);
        let todaysString = findTodaysString(colorStrings);
        let output = '';

        if (!todaysString.text) {
            output = "Sorry, I can’t find information about today on SFGov.org.";
            return;
        }

        console.log('todaysString', todaysString);


        output = "Today is " + moment().format('LL') + '. ';
        output += 'The color of city hall is ' + todaysString.text;

        console.log(output);
    }
});

return;



// function findDateStrings(html) {
//     let $ = cheerio.load(html);

//     const dateStrings = [];

//     $('span').each(function(i, span) {
//         let text = $(this).text().trim();

//         // strip whitespace
//         text = text.replace(/\s\s+/g, ' ');

//         let datePositions = hasDate(text);
//         if (datePositions !== null) {

//             // console.log(text);

//             if (datePositions.length === 1) {
//                 dateStrings.push(text);
//                 return true;
//             }

//             let index = 0;
//             let stringIndex = 0;

//             // console.log(datePositions);

//             while (index < datePositions.length) {
//                 let nextIndex = index + 1;
//                 let nextStringIndex = text.indexOf(datePositions[nextIndex]);
                
//                 nextStringIndex = nextStringIndex == -1 ? undefined : nextStringIndex;
//                 // console.log('nextStringIndex', nextIndex, nextStringIndex);

//                 let string = text.substring(stringIndex, nextStringIndex);

//                 // console.log('string', string);
//                 dateStrings.push(string);

//                 index = nextIndex;
//                 stringIndex = nextStringIndex;
//             }

//             // console.log(dateStrings);
//             // console.log('** DONE');
//         }
//     });

//     return dateStrings;
// }

// function findColorStrings(dateStrings) {
//     let colorStrings = [];

//     dateStrings.forEach(str => {
//         let checkStr = str.toLowerCase();
//         let hasColor = POSSIBLE_COLORS.some(color => checkStr.includes(color));

//         if (hasColor) {
//             colorStrings.push(str);
//         }
//     });

//     return colorStrings;
// }

// function findTodaysString(colorStrings) {
//     let today = null;
//     let todayText = null;

//     colorStrings.some((colorString) => {
//         let splitString = colorString.split(' ');
//         let dateStr = splitString.shift();
//         let textPartString = splitString.join(' ');

//         console.log("checking", dateStr);

//         let momentDate = moment(dateStr);
//         momentDate.set('year', moment().year());

//         if (momentDate.isSame(moment(), 'day')) {
//             today = colorString;
//             todayText = textPartString;
//             return true;
//         }
//     });

//     return { raw: today, text: todayText };
// }


// function hasDate(text) {
//     // return text.match(/(0|[1-9]|1[0-2])\/([1-9]|[12]\d|3[01])/g);
//     return text.match(/\d{1,2}\/\d{1,2}/g);
// }







// request(LIGHTS_URL, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body);
// });

const app = express();
const port = 3000;

app.get('/', (req, res) => {

    fs.readFile('output.html', function (err, data) {
        if (err)
            throw err;
    
        if (data) {
            let dateStrings = findDateStrings(data);
            let colorStrings = findColorStrings(dateStrings);
    
            let todaysString = findTodaysString(colorStrings);
    
            // console.log('todaysString', todaysString);
    
    
            let output = "Today is " + moment().format('LL') + '. ';
            output += 'The color of city hall is ' + todaysString.text;
    
            console.log(output);

            return res.send(output);
        }
    });

});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
