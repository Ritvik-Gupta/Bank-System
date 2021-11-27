import { ENV } from "$$"
import { GraphQLSchemaHost, Plugin } from "@nestjs/graphql"
import {
	ApolloServerPlugin,
	GraphQLRequestContext,
	GraphQLRequestListener,
} from "apollo-server-plugin-base"
import { GraphQLError } from "graphql"
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from "graphql-query-complexity"

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
	constructor(private readonly gqlSchemaHost: GraphQLSchemaHost) {}

	static buildError(complexity: number): GraphQLError {
		return new GraphQLError(
			`Query is too complex: ${complexity}. Maximum allowed complexity: ${ENV.MAX_QUERY_COMPLEXITY}`
		)
	}

	requestDidStart(_requestContext: GraphQLRequestContext): GraphQLRequestListener {
		const { schema } = this.gqlSchemaHost
		return {
			async didResolveOperation({ request: { operationName, variables }, document }) {
				const complexity = getComplexity({
					schema,
					operationName,
					query: document,
					variables,
					estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })],
				})
				console.log(`\nQuery Complexity: ${complexity}\n`)
				if (complexity > ENV.MAX_QUERY_COMPLEXITY) throw ComplexityPlugin.buildError(complexity)
			},
		}
	}
}
