import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { MainContainer } from '@/components/shared/MainContainer/MainContainer'
import { Hero } from '@/components/shared/Hero/Hero'
import { GetStaticProps } from 'next'
import { nextClient } from '../../lib/client'
import {
	GetLayoutQuery,
	GetProductsQuery,
	Product,
	ProductFragment,
} from '../../lib/generated/sdk'

const inter = Inter({ subsets: ['latin'] })

interface PageProps {
	products: ProductFragment[]
}

export default function Page(props: PageProps) {
	const { products } = props

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Hero />
			<MainContainer products={products} />
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const layoutQuery = nextClient.getLayout()
		const productsQuery = nextClient.getProducts()

		const [layout, products] = await Promise.allSettled([
			layoutQuery,
			productsQuery,
		])

		return {
			props: {
				layout: (layout as PromiseFulfilledResult<GetLayoutQuery>).value,
				products: (products as PromiseFulfilledResult<GetProductsQuery>).value
					.products.nodes,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}