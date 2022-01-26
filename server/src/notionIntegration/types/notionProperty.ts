export type NotionProperty =
  | NotionPropertyCheckbox
  | NotionPropertyMultiSelect
  | NotionPropertyTitle;

// possible types
// "title", "rich_text", "number", "select", "multi_select", "date", "people", "files",
// "checkbox", "url", "email", "phone_number", "formula", "relation", "rollup",
// "created_time", "created_by", "last_edited_time", "last_edited_by"

interface NotionPropertyCheckbox {
  id: string;
  type: "checkbox";
  checkbox: boolean;
}

interface NotionPropertyMultiSelect {
  id: string;
  type: "multi_select";
  multi_select: {
    id: string;
    name: string;
    color: "blue";
  }[];
}

interface NotionPropertyTitle {
  id: string;
  type: "title";
  title: {
    type: "text";
    text: { content: string; link: string | null };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: "default";
    };
    plain_text: string;
    href: string | null;
  }[];
}
