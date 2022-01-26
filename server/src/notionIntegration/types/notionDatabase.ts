import { NotionPage } from "./notionPage";

export interface NotionDatabaseList {
  object: "list";
  results: NotionPage[];
  next_cursor: null;
  has_more: false;
}
