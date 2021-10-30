import { ApolloServer, gql } from 'apollo-server-express';
import { typeDefs } from '../schema/schema';
import resolvers from '../schema/resolvers';
import RemedyAPI from '../api/RemedyAPI';
import Remedy from '../models/Remedy';
import PriceStamp from '../models/PriceStamp';



describe('Remedy Queries', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    const mockFindAll = jest.fn();
    mockFindAll.mockReturnValue({
      remedies: [
        {
          id: 1,
          name: 'Asmavent-B',
          categoryId: 2,
          dose: '50 mcg',
          activePrinciple: 3,
          laboratoryId: 4,
          netContent: 200,
          netContentUnitId: 1,
          formatId: 1,
        },
      ],
    });

    jest.mock('../models/Remedy', () => {
      return jest.fn().mockImplementation(() => {
        return { findAll: mockFindAll };
      });
    });

    jest.mock('../models/PriceStamp');

    const remedyAPI = new RemedyAPI({ store: { Remedy, PriceStamp } });

    server = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => ({ remedyAPI }),
    });

  });

  it('fetch remedies', async () => {
    const response = await server.executeOperation({
      query: gql`
        query GetRemedies {
          remedies {
            id
            name
          }
        }
      `,
    });
    expect(response).toMatchSnapshot();
  });

});
