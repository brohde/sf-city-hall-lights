export default {
    "status": "ok",
    "data": {
        "colors": ['red', 'white', 'blue'],
        "description": "in recognition of the City Hall Voting Center Weekend Hours: 10 AM to 4 PM"
    },
    "say": "The colors are {$colors}, {$description}"
};



// response.status !== 'ok' 
//  There is an error, alert me
//  Siri says "Sorry, I'm having trouble getting you information"  (coded in automation)
// 
// Else
//  Siri says response.say

// response.colors used for Hue or other things
