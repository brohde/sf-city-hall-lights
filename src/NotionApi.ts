import { Client, APIErrorCode } from "@notionhq/client";
import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

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

/**
 * Query Notion page NOTION_LIGHTS_DATABASE 
 * 
 * @param date 'YYYY-MM-DD'
 * @returns Promise<QueryDatabaseResponse>
 */
export async function getScheduleRow(date: string): Promise<QueryDatabaseResponse> {
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

export type CleanedScheduleRow = {
  colors: string[],
  description: string
};

/**
 * Clean the QueryDatabaseResponse to return a simpler structure.
 * @param response 
 * @returns ScheduleRow
 */
export function cleanScheduleRow(response: QueryDatabaseResponse) {
  let data: CleanedScheduleRow = {
    colors: [],
    description: ''
  };

  if (!("results" in response)) {
    return data;
  };

  if (!response.results.length) {
    return data;
  }

  const page = response.results[0];

  if (!("properties" in page)) {
    return data;
  }

  const properties = page.properties;

  // Colors
  if ("Colors" in properties && "multi_select" in properties.Colors) {
    const multi_select = properties.Colors.multi_select;
    data.colors = multi_select.map((item) => item.name)
  }

  // Description
  if ("Description" in properties && "title" in properties.Description) {
    try {
      data.description = properties.Description.title[0].plain_text;
    } catch(e) {};

  }

  return data;
}
