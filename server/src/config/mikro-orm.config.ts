import {
  postgresqlDatabaseName,
  postgresqlHost,
  postgresqlPassword,
  // postgresqlURL,
  postgresqlUsername,
  __prod__,
} from "../consts";
import { User, AddDatabaseEntry, Schedule, Automations } from "../entities";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  driverOptions: {
    connection: { ssl: { rejectUnauthorized: false } },
  },
  entities: [User, AddDatabaseEntry, Schedule, Automations],
  host: postgresqlHost,
  // clientUrl: postgresqlURL,
  dbName: postgresqlDatabaseName,
  type: "postgresql" as "postgresql",
  debug: !__prod__,
  user: postgresqlUsername,
  password: postgresqlPassword,
} as Parameters<typeof MikroORM.init>[0];
