import { addColor, getColors } from "../models/index.js";

const typeDefs = `#graphql
  type Color {
    _id: ID
    name: String
    year: Int
    color: String
    pantone_value: String
  }

  input ColorInput {
    name: String!
    year: Int!
    color: String!
    pantone_value: String!
  }

  type Query {
    colors: ResponseColor
  }

  type Mutation {
    colorAdd(color: ColorInput): ResponseColorAdd
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
	Mutation: {
		colorAdd: async (_, { color }, contextValue) => {
			const { id, randomNumber } = contextValue.doAuthentication();

			const newColor = await addColor(color);

			return {
				statusCode: 200,
				message: `${id}-${randomNumber}`,
				data: newColor,
			};
		},
	},
};

export const colorTypeDefs = typeDefs;
export const colorResolvers = resolvers;
