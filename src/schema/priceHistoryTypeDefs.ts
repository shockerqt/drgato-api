import { gql } from 'apollo-server-core';

export default gql`

  type PriceHistory {
    id: ID!
    remedy: Remedy!
    pharmacy: Pharmacy!
    url: String
    priceStamps: [PriceStamp]
  }

`;
