import { ReactNode } from 'react'
import styles from './ContentPage.module.css'

interface ContentPageProps {
	children: ReactNode
}

export function ContentPage(props: ContentPageProps) {
	return <article className={styles['content-page']}>{props.children}</article>
}
