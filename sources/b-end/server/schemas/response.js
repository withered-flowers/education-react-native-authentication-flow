const typeDefs = `#graphql
  interface Response {
    statusCode: Int!
    message: String
  }

  type ResponseColor implements Response {
    statusCode: Int!
    message: String
    data: [Color]!
  }

  type ResponseColorAdd implements Response {
    statusCode: Int!
    message: String
    data: ResponseColorAddData
  }

  type ResponseColorAddData {
    acknowledged: Boolean!
    insertedId: ID!
  }

  type ResponseUser implements Response {
    statusCode: Int!
    message: String
    data: ResponseUserData
  }

  type ResponseUserData {
    token: String
  }
`;

export const responseTypeDefs = typeDefs;
