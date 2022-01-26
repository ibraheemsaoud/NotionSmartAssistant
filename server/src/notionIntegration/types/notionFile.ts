export type NotionFile = NotionFileEXternal | NotionUploadedFile;

interface NotionFileEXternal {
  type: "external";
  external: {
    url: "https://website.domain/images/image.png";
  };
}

interface NotionUploadedFile {
  type: "file";
  url: string;
  expiry_time: string;
}

export interface EmojiObject {
  type: "emoji";
  emoji: string;
}
