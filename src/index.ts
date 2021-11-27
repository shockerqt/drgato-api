import { ApolloServer } from 'apollo-server-lambda';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { typeDefs, resolvers } from './schema';
import Store from './models';
import { RemedyAPI } from './api';

export interface DataSources {
  remedyAPI: RemedyAPI;
}

const store = new Store();

store.init();

const dataSources = {
  remedyAPI: new RemedyAPI({ store }),
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => dataSources,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

export const handler = apolloServer.createHandler();
