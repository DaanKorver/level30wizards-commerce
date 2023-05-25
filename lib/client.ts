import { GraphQLClient } from 'graphql-request'
import { getSdkWithHooks } from './generated/sdk'

const API_URL = `https://${process.env.PUBLIC_STORE_DOMAIN}/api/${process.env.PUBLIC_STOREFRONT_API_VERSION}/graphql.json`

const nextGraphQlClient = new GraphQLClient(API_URL || '', {
	headers: {
		'X-Shopify-Storefront-Access-Token': `${process.env.PUBLIC_STOREFRONT_API_TOKEN}`,
	},
})

// Use this server side, it directly calls the Umbraco GraphQL endpoint
export const nextClient = getSdkWithHooks(nextGraphQlClient)
