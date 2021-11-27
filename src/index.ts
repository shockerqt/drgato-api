import { ApolloServer } from 'apollo-server-lambda';

import { typeDefs, resolvers } from './schema';
import Store from './models';
import { RemedyAPI } from './api';

export interface DataSources {
  remedyAPI: RemedyAPI;
}

const store = new Store();

const dataSources = {
  remedyAPI: new RemedyAPI({ store }),
};

const startServer = async () => {
  await store.init();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => dataSources,
  });

  return apolloServer.createHandler();
};

export const handler = startServer();
