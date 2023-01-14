import { Client, APIErrorCode } from "@notionhq/client";
import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import moment from 'moment';

export const TODAY = moment().format('YYYY-MM-DD');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const NOTION_LIGHTS_DATABASE = process.env.NOTION_LIGHTS_DATABASE;
const NOTION_TOKEN = process.env.NOTION_TOKEN;

if (!NOTION_LIGHTS_DATABASE) {
  throw new Error('NOTION_LIGHTS_DATABASE environment variable not set.');
}

if (!NOTION_TOKEN) {
  throw new Error('NOTION_TOKEN environment variable not set.');
}

const notion = new Client({
  auth: NOTION_TOKEN
});

interface ShortcutsResponse {
  date: string,
  colors: string[],
  description: string
}

/**
 * Query Notion page NOTION_LIGHTS_DATABASE 
 * 
 * @param date 'YYYY-MM-DD'
 * @returns Promise<QueryDatabaseResponse>
 */
async function api(date: string): Promise<QueryDatabaseResponse> {
  const response = await notion.databases.query({
    database_id: NOTION_LIGHTS_DATABASE as string,
    sorts: [
      {
        property: 'Date',
        direction: 'descending'
      }
    ],
    filter: {
      property: 'Date',
      date: {
        equals: date
      }
    }
  });

  return response;
}


// Expose for testing
export const _api = api;

/**
 * Format QueryDatabaseResponse to ShortcutsResponse to expose only the data we need
 * to make navigating it in iOS Shortcuts easier.
 * @param response 
 * @returns Object
 */
function format(response: Object) {
  return response;
  
  console.log('*** RESPONSE', response);

  // const page = response.results[0] as PageObjectResponse;
  // const colorsRaw = page.properties.Colors['multi_select'];

  // const colors = page.properties['Colors']['multi_select'].map( data => data.name);
  // console.log('**** COLORS', colors);

  const json = {
    "status": "ok",
    "data": {
        "colors": ['red', 'white', 'blue'],
        "description": "in recognition of the City Hall Voting Center Weekend Hours: 10 AM to 4 PM"
    },
    "say": "The colors are {$colors}, {$description}"
  };

  return json;
}

// Expose for testing
export const _format = format;


/**
 * Reads from Notion schedule page 
 * @returns 
 */
export async function get(date: string = TODAY) {
  const response = await api(date);
  const formattedResponse = format(response);
  return formattedResponse;
}
