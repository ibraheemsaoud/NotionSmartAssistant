import { __prod__ } from "../consts";
import { User, AddDatabaseEntry, Schedule, Automations } from "../entities";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [User, AddDatabaseEntry, Schedule, Automations],
  url: process.env.DATABASE_URL,
  type: "postgresql" as "postgresql",
  debug: !__prod__,
  logging: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
