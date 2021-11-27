import { ApolloServer } from 'apollo-server';

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

  const { url } = await apolloServer.listen();

  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);

  return apolloServer;
};

startServer();
