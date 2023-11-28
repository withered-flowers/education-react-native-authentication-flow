const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { colorTypeDefs, colorResolvers } = require("./schemas/color");
const { responseTypeDefs } = require("./schemas/response");
const { userTypeDefs, userResolvers } = require("./schemas/user");
const { getClientInstance } = require("./config/db");
const { GraphQLError } = require("graphql");

const server = new ApolloServer({
  typeDefs: [colorTypeDefs, userTypeDefs, responseTypeDefs],
  resolvers: [colorResolvers, userResolvers],
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
    context: async ({ req, res }) => {
      await getClientInstance();

      return {
        doAuthentication: () => {
          // !! In a real world scenario we need to validate the token
          // !! and return the user data

          if (!req.headers.authorization) {
            throw new GraphQLError("Unauthorized");
          }

          const token = req.headers.authorization.split(" ")[1];

          // ?? Remember the format is <userId>.<randomString>
          const [userId, randomNumber] = token.split(".");

          return {
            id: userId,
            randomNumber,
          };
        },
      };
    },
  });

  console.log(`🚀  Server ready at ${url}`);
})();
