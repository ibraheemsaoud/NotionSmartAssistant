import { EmojiObject, NotionFile } from "./notionFile";
import { NotionProperty } from "./notionProperty";
import { NotionParent } from "./notionParent";

export interface NotionPage {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  cover: string | null;
  icon: EmojiObject | NotionFile | null;
  parent: NotionParent;
  archived: boolean;
  properties: NotionProperty;
  url: string;
}
