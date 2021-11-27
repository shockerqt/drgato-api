import { ApolloServer } from 'apollo-server-lambda';

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
});

export const handler = apolloServer.createHandler();
