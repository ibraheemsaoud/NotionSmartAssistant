import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver, UsersResolver } from "./resolvers";
import { micorConfig } from "./config";

const main = async () => {
  const orm = await MikroORM.init(micorConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UsersResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

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
