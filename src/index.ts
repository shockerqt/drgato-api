import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { DocumentNode } from 'graphql';

import { typeDefs, resolvers } from './schema';
import { createStore } from './utils';
import RemedyAPI from './api/RemedyAPI';


const startApolloServer = async (typeDefs: DocumentNode[], resolvers: any) => {
  const app = express();
  const httpServer = http.createServer(app);

  const store = createStore();

  const dataSources = () => ({
    remedyAPI: new RemedyAPI({ store }),
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/',
  });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`, resolve);
  }));
};

startApolloServer(typeDefs, resolvers);
