import { GetStaticPaths, GetStaticProps } from 'next'
import { nextClient } from '../../../lib/client'
import {
	GetLayoutQuery,
	GetProductByHandleQuery,
} from '../../../lib/generated/sdk'

interface PageProps {
	product: GetProductByHandleQuery['productByHandle']
}

export default function Page(props: PageProps) {
	const { product } = props
	return (
		<div className="container" style={{ paddingTop: '70px' }}>
			<h1>{product?.title}</h1>
			<pre>{JSON.stringify(product, null, 2)}</pre>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = await nextClient.getProductSlugs()
	const paths = slugs.products.nodes.map(node => ({
		params: {
			slug: node.handle,
		},
	}))

	return {
		paths: paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const layoutQuery = nextClient.getLayout()
		const productQuery = nextClient.getProductByHandle({
			handle: params?.slug as string,
		})

		const [layout, product] = await Promise.allSettled([
			layoutQuery,
			productQuery,
		])

		return {
			props: {
				layout: (layout as PromiseFulfilledResult<GetLayoutQuery>).value,
				product: (product as PromiseFulfilledResult<GetProductByHandleQuery>)
					.value.productByHandle,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}
