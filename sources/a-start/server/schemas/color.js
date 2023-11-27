const { getColors } = require("../models");

const typeDefs = `#graphql
  type Color {
    _id: ID
    name: String
    year: Int
    color: String
    pantone_value: String
  }

  type Query {
    colors: ResponseColor
  }
`;

const resolvers = {
  Query: {
    colors: async (_, __, contextValue) => {
      const { id, randomNumber } = contextValue.doAuthentication();
      const colors = await getColors();

      return {
        statusCode: 200,
        message: `${id}-${randomNumber}`,
        data: colors,
      };
    },
  },
};

module.exports = {
  colorTypeDefs: typeDefs,
  colorResolvers: resolvers,
};
