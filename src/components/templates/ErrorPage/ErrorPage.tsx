import styles from './ErrorPage.module.css'

interface ErrorPageProps {
	statusCode?: number | null
}

export function ErrorPage(props: ErrorPageProps) {
	return (
		<section className={styles['error-container']}>
			<h1 style={{ marginTop: '70px' }}>{props?.statusCode || 404}</h1>
			<p>Not found</p>
		</section>
	)
}
