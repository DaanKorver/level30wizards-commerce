import { ErrorPage } from '@/components/templates/ErrorPage/ErrorPage'
import { GetStaticProps, NextPage } from 'next'
import { nextClient } from '../../lib/client'
import { GetLayoutQuery } from '../../lib/generated/sdk'

export interface ErrorProps {
	statusCode?: number | null
}

const Error: NextPage<ErrorProps> = props => <ErrorPage {...props} />

export const getStaticProps: GetStaticProps = async () => {
	try {
		const layoutQuery = nextClient.getLayout()

		const [layout] = await Promise.allSettled([layoutQuery])

		return {
			props: {
				layout: (layout as PromiseFulfilledResult<GetLayoutQuery>).value,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default Error
