import { MenuItem } from '../../../../lib/generated/sdk'
import styles from './Footer.module.css'

export type Items = {
	title: string
	url: string
}

interface FooterProps {
	items: { title: string; items: Items[] }[]
}

export function Footer(props: FooterProps) {
	const { items } = props

	return (
		<footer className={styles['footer']}>
			<div className="container">
				<div className={styles['footer-items']}>
					{items.map(item => (
						<FooterList
							key={item.title}
							title={item.title}
							items={item.items}
						/>
					))}
				</div>
				<hr className={styles['footer-divider']} />
				<div className={styles['footer-underline']}>
					<p>Copyright Donuts 2023</p>
					<p className="bold">Rounds</p>
				</div>
			</div>
		</footer>
	)
}

function FooterList(props: { title: string; items: Items[] }) {
	const { title, items } = props

	return (
		<div className={styles['footer-list']}>
			<h3 className="fs-2xl">{title}</h3>
			<ul>
				{items.map(item => (
					<li key={item.url}>
						<a href={item.url}>{item.title}</a>
					</li>
				))}
			</ul>
		</div>
	)
}
