import { Client } from "./NotionApiClient";
import * as NotionApi from './NotionApi';
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import SCHEDULE_ROW_MOCK_RESPONSE from './schedule-row-mock-response.json';

let response: QueryDatabaseResponse;

jest.mock("./NotionApiClient");

beforeAll(async () => {
  Client.databases.query = jest.fn().mockResolvedValue(SCHEDULE_ROW_MOCK_RESPONSE as QueryDatabaseResponse)
  response = await NotionApi.getScheduleRow();
});

afterAll(() => {
});

test('getScheduleRow has response data', async () => {
  expect(response.results.length).toBe(1);
});

test('cleanScheduleRow', () => {
  const data = NotionApi.cleanScheduleRow(response);

  expect(data).toMatchObject({
    colors: ['Pink', 'Orange'],
    description: 'in honor of testing and building this app.'
  });
});
