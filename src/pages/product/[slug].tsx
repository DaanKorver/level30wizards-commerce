import { GetStaticPaths, GetStaticProps } from 'next'
import { nextClient } from '../../../lib/client'
import {
	GetLayoutQuery,
	GetProductByHandleQuery,
} from '../../../lib/generated/sdk'
import Image from 'next/image'
import { MediaImage } from '../../../lib/generated/sdk'
import { SingleProduct } from '@/components/shared/SingleProduct/SingleProduct'
import { ProductProvider } from '@shopify/hydrogen-react'

interface PageProps {
	product: GetProductByHandleQuery['productByHandle']
}

export default function Page(props: PageProps) {
	const { product } = props

	return (
		product && (
			<ProductProvider data={product}>
				<div className="container" style={{ paddingTop: '70px' }}>
					<SingleProduct item={product} />
				</div>
			</ProductProvider>
		)
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
