import { NotionConfig } from "../config/notion";
import { NotionDatabaseList } from "./types/notionDatabase";

const { Client } = require("@notionhq/client");

export const NotionHandler = () => {
  // Initializing a client
  const notion = new Client({
    auth: NotionConfig.NOTION_KEY,
  });

  // Getting a page
  const loadDatabase = async (
    database_id: string
  ): Promise<NotionDatabaseList> => {
    return await notion.databases.query({
      database_id: database_id,
      start_cursor: null,
    });
  };

  const updateDatabase = async (
    database_id: string
  ): Promise<NotionDatabaseList> => {
    return await notion.databases.query({
      database_id: database_id,
      start_cursor: null,
    });
  };

  return { loadDatabase, updateDatabase };
};
