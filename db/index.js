/* 
 Phase 1 - Access notion DB, get current date entry
*/

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { Client, APIErrorCode } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

async function users() {
    ;(async () => {
        const listUsersResponse = await notion.users.list({})
        console.log(listUsersResponse)
    })()
}

async function lights() {
    try {
        const myPage = await notion.databases.query({
          database_id: process.env.NOTION_LIGHTS_DATABASE,
        //   filter: {
        //     property: "Landmark",
        //     rich_text: {
        //       contains: "Bridge",
        //     },
        //   },
        })

        return myPage;
      } catch (error) {
        if (error.code === APIErrorCode.ObjectNotFound) {
          //
          // For example: handle by asking the user to select a different database
          //
        } else {
          // Other error handling code
          console.error(error)
        }
      }
}

module.exports = { users, lights };
