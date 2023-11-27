const { getUserByEmailAndPassword } = require("../models");

const typeDefs = `#graphql
  type User {
    _id: ID
    email: String
    password: String
    avatar: String
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type Query {
    login(inputLogin: UserLoginInput): ResponseUser
  }
`;

const resolvers = {
  Query: {
    login: async (_, args) => {
      const { inputLogin } = args;
      const { email, password } = inputLogin;

      const user = await getUserByEmailAndPassword(email, password);

      return {
        statusCode: 200,
        message: "OK",
        data: {
          // ?? Custom Token: <userId>.<randomString>
          // !! Never use this type of token in production
          token: `${user._id}.1234567890`,
        },
      };
    },
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};
