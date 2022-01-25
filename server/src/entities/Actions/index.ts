import { registerEnumType } from "type-graphql";

export * from "./AddDatabaseEntery";

export enum ActionTypes {
  ADD_DATABASE_ENTRY,
}

registerEnumType(ActionTypes, {
  name: "ActionTypes",
});
