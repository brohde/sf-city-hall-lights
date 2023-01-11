import { Client, APIErrorCode } from "@notionhq/client";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

interface LightSchedule {
  date: string,
  colors: string[],
  description: string
}

function getRows() {

}

/**
 * Reads from Notion schedule page 
 * @returns 
 */
export async function lights() {
  const LIGHTS_DATABASE = process.env['NOTION_LIGHTS_DATABASE'];

  if (!LIGHTS_DATABASE) {
    throw new Error('NOTION_LIGHTS_DATABASE environment variable not set.');
  }

  const data = await notion.databases.query({
    database_id: LIGHTS_DATABASE,
    sorts: [
      {
        property: 'Date',
        direction: 'descending'
      }
    ],
    filter: {
      property: 'Date',
      date: {
        equals: '2022-11-28'
      }
    }
  });

  return data;
}
