import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { Client, NOTION_LIGHTS_DATABASE } from "./NotionApiClient";
import moment from 'moment';

const TODAY = () => moment().format('YYYY-MM-DD');

/**
 * Query Notion page NOTION_LIGHTS_DATABASE 
 * 
 * @param date 'YYYY-MM-DD'
 * @returns Promise<QueryDatabaseResponse>
 */
export async function getScheduleRow(date: string = TODAY()): Promise<QueryDatabaseResponse> {
  const response = await Client.databases.query({
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

