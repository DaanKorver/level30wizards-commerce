import { GetStaticPaths, GetStaticProps } from 'next'
import { nextClient } from '../../lib/client'
import { GetLayoutQuery, GetPagesQuery } from '../../lib/generated/sdk'
import { ContentPage } from '@/components/shared/ContentPage/ContentPage'

interface PageProps {
	page: {
		handle: string
		body: any
		title: string
	}
}

export default function Page(props: PageProps) {
	const { page } = props

	return (
		<ContentPage>
			<h1>{page.title}</h1>
			<p>{page.body}</p>
		</ContentPage>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const pages = await nextClient.getPages()
	const pageArr = Object.values(pages.pages.nodes)

	const paths = pageArr.map(page => ({
		params: {
			slug: page.handle,
		},
	}))

	return {
		paths: [],
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const layoutQuery = await nextClient.getLayout()
		const pageQuery = nextClient.getPages()

		const [layout, page] = await Promise.allSettled([layoutQuery, pageQuery])

		const _page = (
			page as PromiseFulfilledResult<GetPagesQuery>
		).value.pages.nodes.find(node => node.handle === params?.slug)

		if (!_page) {
			throw 'No page found'
		}

		return {
			props: {
				layout: (layout as PromiseFulfilledResult<GetLayoutQuery>).value,
				page: _page ?? null,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}
