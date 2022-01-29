"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresqlDatabaseName = exports.postgresqlURL = exports.postgresqlHost = exports.postgresqlPassword = exports.postgresqlUsername = exports.PORT = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV === "prodution";
exports.PORT = process.env.PORT || 5000;
exports.postgresqlUsername = "cvzfckxrmymfim";
exports.postgresqlPassword = "2bf89ba910b9be6bb02b87eb96b7ff1eca54e5e0e566bffa431ecf3dc9b31953";
exports.postgresqlHost = "ec2-99-81-177-233.eu-west-1.compute.amazonaws.com";
exports.postgresqlURL = "postgres://cvzfckxrmymfim:2bf89ba910b9be6bb02b87eb96b7ff1eca54e5e0e566bffa431ecf3dc9b31953@ec2-99-81-177-233.eu-west-1.compute.amazonaws.com:5432/db2r328c3t9f7d";
exports.postgresqlDatabaseName = "db2r328c3t9f7d";
//# sourceMappingURL=env.js.map