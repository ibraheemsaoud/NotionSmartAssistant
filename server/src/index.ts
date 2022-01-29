import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
const https = require("https");
const fs = require("fs");
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {
  AddDatabaseEnteryResolver,
  AutomationResolver,
  ScheduleResolver,
  UsersResolver,
} from "./resolvers";
import { micorConfig } from "./config";
import cors from "cors";
import { PORT } from "./consts";
// import { NotionHandler } from "./notionIntegration";

const main = async () => {
  const orm = await MikroORM.init(micorConfig);
  await orm.getMigrator().up();

  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UsersResolver,
        AutomationResolver,
        ScheduleResolver,
        AddDatabaseEnteryResolver,
      ],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.get("/", (_, res) => {
    res.send("hello");
  });

  // app.listen(PORT, () => {
  //   console.log("server started");
  // });

  // const database = await NotionHandler().loadDatabase(
  //   "5364a402d22d4bf7ad8a9f56fe6ffc03"
  // );
  // console.log(
  //   NotionHandler().updateDatabase("5364a402d22d4bf7ad8a9f56fe6ffc03")
  // );

  var key = fs.readFileSync(__dirname + "/../certs/selfsigned.key");
  var cert = fs.readFileSync(__dirname + "/../certs/selfsigned.crt");
  var options = {
    key: key,
    cert: cert,
  };

  var server = https.createServer(options, app);

  server.listen(PORT, () => {
    console.log("server starting on port : " + PORT);
  });
};

main().catch((err) => {
  console.error(err);
});
