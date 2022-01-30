import "reflect-metadata";
import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
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
import "dotenv-safe/config";
// import { NotionHandler } from "./notionIntegration";

const main = async () => {
  let orm: MikroORM<IDatabaseDriver<Connection>>;
  let retries = 5;
  while (retries > 0) {
    try {
      orm = await MikroORM.init(micorConfig);
      await orm.getMigrator().up();
      break;
    } catch (e) {
      console.log(e);
      retries--;
      console.log(`retries left: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  const app = express();

  app.use(
    cors({
      origin: [process.env.CORS_ORIGIN, "https://studio.apollographql.com"],
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

  app.listen(parseInt(process.env.PORT, 10), () => {
    console.log("server started");
  });

  // const database = await NotionHandler().loadDatabase(
  //   "5364a402d22d4bf7ad8a9f56fe6ffc03"
  // );
  // console.log(
  //   NotionHandler().updateDatabase("5364a402d22d4bf7ad8a9f56fe6ffc03")
  // );
};

main().catch((err) => {
  console.error(err);
});
