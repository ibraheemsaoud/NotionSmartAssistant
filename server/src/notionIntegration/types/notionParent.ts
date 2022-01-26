import { NotionPage } from "./notionPage";

export interface NotionParentDatabase {
  type?: "database_id";
  database_id: string;
}

export interface NotionParentPage {
  type: "page_id";
  database_id: string;
}

export interface NotionParentWorkspace {
  type: "workspace";
  workspace: true;
}

export type NotionParent =
  | NotionParentDatabase
  | NotionPage
  | NotionParentWorkspace;
