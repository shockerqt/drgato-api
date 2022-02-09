import { ApolloServer } from 'apollo-server';

import { typeDefs, resolvers } from './schema';
import Store from './models';
import { RemedyAPI } from './api';

export interface DataSources {
  remedyAPI: RemedyAPI;
}

const startServer = async () => {

  const store = new Store();
  await store.init();

  const dataSources = {
    remedyAPI: new RemedyAPI({ store }),
  };

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
