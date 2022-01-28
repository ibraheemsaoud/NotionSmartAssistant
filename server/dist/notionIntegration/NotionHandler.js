"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionHandler = void 0;
const notion_1 = require("../config/notion");
const { Client } = require("@notionhq/client");
const NotionHandler = () => {
    const notion = new Client({
        auth: notion_1.NotionConfig.NOTION_KEY,
    });
    const loadDatabase = (database_id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield notion.databases.query({
            database_id: database_id,
            start_cursor: undefined,
        });
    });
    const updateDatabase = (database_id) => __awaiter(void 0, void 0, void 0, function* () {
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
        return yield notion.pages.create(Object.assign({ parent: {
                database_id,
            } }, example));
    });
    return { loadDatabase, updateDatabase };
};
exports.NotionHandler = NotionHandler;
//# sourceMappingURL=NotionHandler.js.map