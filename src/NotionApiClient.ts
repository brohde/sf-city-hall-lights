import { Client, APIErrorCode } from "@notionhq/client";

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

export {
  notion as Client,
  NOTION_LIGHTS_DATABASE,
}
