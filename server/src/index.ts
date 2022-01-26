import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
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
import { NotionHandler } from "./notionIntegration";

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

  // app.get("/", (_, res) => {
  //   res.send("hello");
  // });

  app.listen(4001, () => {
    console.log("server started");
  });

  // console.log(
  //   (await NotionHandler().loadDatabase("0563510848174e7680a609e4e1ac7fea"))
  //     .results[0].cover
  // );
};

main().catch((err) => {
  console.error(err);
});
