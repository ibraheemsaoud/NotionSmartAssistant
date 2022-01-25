import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AutomationResolver, UsersResolver } from "./resolvers";
import { micorConfig } from "./config";
import cors from "cors";

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
      resolvers: [UsersResolver, AutomationResolver],
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
};

main().catch((err) => {
  console.error(err);
});
