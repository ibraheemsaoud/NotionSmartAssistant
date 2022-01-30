import { NotionConfig } from "../config/notion";
import { NotionDatabaseList } from "./types/notionDatabase";

const { Client } = require("@notionhq/client");
import { NotionPage } from "./types/notionPage";

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
      start_cursor: undefined,
    });
  };

  const updateDatabase = async (
    database_id: string
  ): Promise<NotionDatabaseList> => {
    // const propertiesData: NotionPage[] = [
    //   {
    //     object: "page",
    //     cover: null,
    //     icon: null,
    //     parent: {
    //       type: "database_id",
    //       database_id: database_id,
    //     },
    //     archived: false,
    //     properties: {
    //       Name: {
    //         type: "title",
    //         title: [
    //           {
    //             type: "text",
    //             text: { content: "4", link: null },
    //             plain_text: "4",
    //             href: null,
    //           },
    //         ],
    //       },
    //       Tag: {
    //         type: "multi_select",
    //         multi_select: [],
    //       },
    //     },
    //   },
    // ];

    const example = {
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "done from code",
              },
            },
          ],
        },
        Tags: {
          multi_select: [],
        },
      },
    };

    return await notion.pages.create({
      parent: {
        database_id,
      },
      ...example,
    } as NotionPage);
  };

  return { loadDatabase, updateDatabase };
};
