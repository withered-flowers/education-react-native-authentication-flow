import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { getClientInstance } from "./config/db.js";
import { colorResolvers, colorTypeDefs } from "./schemas/color.js";
import { responseTypeDefs } from "./schemas/response.js";
import { userResolvers, userTypeDefs } from "./schemas/user.js";

const server = new ApolloServer({
	typeDefs: [colorTypeDefs, userTypeDefs, responseTypeDefs],
	resolvers: [colorResolvers, userResolvers],
});

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
