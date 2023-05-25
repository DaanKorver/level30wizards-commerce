require('dotenv').config({
	path: __dirname + '/.env',
})

const API_URL = `https://${process.env.PUBLIC_STORE_DOMAIN}/api/${process.env.PUBLIC_STOREFRONT_API_VERSION}/graphql.json`

module.exports = {
	schema: [
		{
			[API_URL]: {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'X-Shopify-Storefront-Access-Token': `${process.env.PUBLIC_STOREFRONT_API_TOKEN}`,
				},
			},
		},
	],
	documents: './lib/graphql/**/*.gql',
	extensions: {
		endpoints: {
			default: {
				url: API_URL,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'X-Shopify-Storefront-Access-Token': `${process.env.PUBLIC_STOREFRONT_API_TOKEN}`,
				},
			},
		},
		codegen: {
			overwrite: true,
			generates: {
				'./lib/generated/graphql.schema.json': {
					plugins: ['introspection'],
				},
				'./lib/generated/sdk.ts': {
					plugins: [
						'typescript',
						'typescript-operations',
						'typescript-graphql-request',
						'plugin-typescript-swr',
					],
					config: {
						fetcher: {
							endpoint: {
								[API_URL]: {
									headers: {
										'Content-Type': 'application/json',
										Accept: 'application/json',
										Authorization: `${process.env.PUBLIC_STOREFRONT_API_TOKEN}`,
									},
								},
							},
						},
						rawRequest: false,
						inlineFragmentTypes: 'combine',
						skipTypename: false,
						exportFragmentSpreadSubTypes: true,
						dedupeFragments: true,
						preResolveTypes: true,
					},
				},
				'./lib/generated/schema.graphql': {
					// for developer lookup (unused)
					plugins: ['schema-ast'],
				},
			},
		},
	},
}
