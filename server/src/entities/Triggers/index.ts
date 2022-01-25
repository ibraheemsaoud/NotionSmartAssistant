import { registerEnumType } from "type-graphql";

export * from "./Schedule";

export enum TriggerTypes {
  SCHEDULE,
}

registerEnumType(TriggerTypes, {
  name: "TriggerTypes",
});
