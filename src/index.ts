import { ApolloServer } from 'apollo-server-lambda';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

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

export const handler = async () => {
  await store.init();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => dataSources,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  return apolloServer.createHandler();
};
