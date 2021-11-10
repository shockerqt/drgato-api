import { ApolloServer } from 'apollo-server';

import { typeDefs, resolvers } from './schema';
import Store from './store';
import { RemedyAPI } from './api';

const store = new Store();

export interface DataSources {
  remedyAPI: RemedyAPI;
}

const dataSources = {
  remedyAPI: new RemedyAPI({ store }),
};

const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => dataSources,
  });

  const { url } = await apolloServer.listen();

  console.log(`🚀  Server ready at ${url}`);

  return apolloServer;
};

startServer();
