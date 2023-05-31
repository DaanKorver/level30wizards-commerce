import { GetStaticPaths, GetStaticProps } from 'next'
import { nextClient } from '../../../lib/client'
import {
	GetLayoutQuery,
	GetLegalsQuery,
	LegalFragment,
} from '../../../lib/generated/sdk'
import styles from './Legal.module.css'
import { ContentPage } from '@/components/shared/ContentPage/ContentPage'

interface PageProps {
	legal: LegalFragment
}

export default function Page(props: PageProps) {
	const { legal } = props
	return (
		<ContentPage>
			<h1>{legal.title}</h1>
			<p>{legal.body}</p>
		</ContentPage>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const legals = await nextClient.getLegals()

	const paths = Object.values(legals.shop)
		.map(legal => {
			if ((legal as LegalFragment)?.handle) {
				return {
					params: {
						slug: (legal as LegalFragment).handle,
					},
				}
			}
		})
		.filter(path => path !== undefined)

	return {
		paths: paths as {
			params: {
				slug: string
			}
		}[],
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const layoutQuery = nextClient.getLayout()
		const legalQuery = nextClient.getLegals()

		const [layout, legals] = await Promise.allSettled([layoutQuery, legalQuery])

		const legalArr = Object.values(
			(legals as PromiseFulfilledResult<GetLegalsQuery>).value.shop
		)
		const legal = legalArr.find(
			legal => (legal as LegalFragment)?.handle === params?.slug
		)

		return {
			props: {
				layout: (layout as PromiseFulfilledResult<GetLayoutQuery>).value,
				legal,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}
