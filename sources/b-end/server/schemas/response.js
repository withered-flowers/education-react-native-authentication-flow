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

  type ResponseUser implements Response {
    statusCode: Int!
    message: String
    data: ResponseUserData
  }

  type ResponseUserData {
    token: String
  }
`;

module.exports = {
  responseTypeDefs: typeDefs,
};
