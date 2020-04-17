const cheerio = require('cheerio');
const moment = require('moment');

const POSSIBLE_COLORS = [
    'red',
    'blue',
    'white',
    'green',
];

function findDateStrings(html) {
    let $ = cheerio.load(html);

    const dateStrings = [];

    $('span').each(function(i, span) {
        let text = $(this).text().trim();

        // strip whitespace
        text = text.replace(/\s\s+/g, ' ');

        let datePositions = hasDate(text);
        if (datePositions !== null) {

            // console.log(text);

            if (datePositions.length === 1) {
                dateStrings.push(text);
                return true;
            }

            let index = 0;
            let stringIndex = 0;

            // console.log(datePositions);

            while (index < datePositions.length) {
                let nextIndex = index + 1;
                let nextStringIndex = text.indexOf(datePositions[nextIndex]);
                
                nextStringIndex = nextStringIndex == -1 ? undefined : nextStringIndex;
                // console.log('nextStringIndex', nextIndex, nextStringIndex);

                let string = text.substring(stringIndex, nextStringIndex);

                // console.log('string', string);
                dateStrings.push(string);

                index = nextIndex;
                stringIndex = nextStringIndex;
            }

            // console.log(dateStrings);
            // console.log('** DONE');
        }
    });

    return dateStrings;
}

function hasDate(text) {
    // return text.match(/(0|[1-9]|1[0-2])\/([1-9]|[12]\d|3[01])/g);
    return text.match(/\d{1,2}\/\d{1,2}/g);
}

function findColorStrings(dateStrings) {
    let colorStrings = [];

    dateStrings.forEach(str => {
        let checkStr = str.toLowerCase();
        let hasColor = POSSIBLE_COLORS.some(color => checkStr.includes(color));

        if (hasColor) {
            colorStrings.push(str);
        }
    });

    return colorStrings;
}

function findTodaysString(colorStrings) {
    let today = null;
    let todayText = null;

    colorStrings.some((colorString) => {
        let splitString = colorString.split(' ');
        let dateStr = splitString.shift();
        let textPartString = splitString.join(' ');

        console.log("checking", dateStr);

        let momentDate = moment(dateStr);
        momentDate.set('year', moment().year());

        if (momentDate.isSame(moment(), 'day')) {
            today = colorString;
            todayText = textPartString;
            return true;
        }
    });

    return { raw: today, text: todayText };
}



module.exports = {
    findDateStrings,
    hasDate,
    findColorStrings,
    findTodaysString
};

