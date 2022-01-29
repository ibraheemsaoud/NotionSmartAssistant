"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../consts");
const entities_1 = require("../entities");
const path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    driverOptions: {
        connection: { ssl: { rejectUnauthorized: false } },
    },
    entities: [entities_1.User, entities_1.AddDatabaseEntry, entities_1.Schedule, entities_1.Automations],
    host: consts_1.postgresqlHost,
    dbName: consts_1.postgresqlDatabaseName,
    type: "postgresql",
    debug: !consts_1.__prod__,
    user: consts_1.postgresqlUsername,
    password: consts_1.postgresqlPassword,
};
//# sourceMappingURL=mikro-orm.config.js.map