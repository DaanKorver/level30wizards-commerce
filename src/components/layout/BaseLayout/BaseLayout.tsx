import { ReactNode } from 'react'
import styles from './BaseLayout.module.css'
import { Header } from '../Header/Header'
import { Footer, Items } from '../Footer/Footer'
import { GetLayoutQuery, MenuItem } from '../../../../lib/generated/sdk'
import sanitizeUrls from '@/utils/sanitizeUrl'
import { CartDrawer } from '@/components/shared/CartDrawer/CartDrawer'

interface BaseLayoutProps {
	layout: GetLayoutQuery
	children: ReactNode
}

export function BaseLayout(props: BaseLayoutProps) {
	const { layout, children } = props

	const { primaryDomain } = layout.shop
	const headerItems = sanitizeUrls(
		layout.header?.items as MenuItem[],
		primaryDomain.url
	)

	const exploreItems = sanitizeUrls(
		layout.explore?.items as MenuItem[],
		primaryDomain.url
	)
	const socialItems = layout.socials?.items

	let legalItems = Object.entries(layout.shop)
	legalItems = legalItems.filter(([key, value]) => {
		return (
			key.toLowerCase().includes('policy') ||
			key.toLowerCase().includes('service')
		)
	})
	const formatedLegalItems = (legalItems as []).map(legal => {
		const { title, handle } = legal[1]
		return { title, url: `/legal/${handle}` }
	})

	const footerItems = [
		{
			items: exploreItems,
			title: 'Explore',
		},
		{
			items: formatedLegalItems,
			title: 'Legal',
		},
		{
			items: socialItems as unknown[],
			title: 'Social',
		},
	]
	return (
		<>
			<CartDrawer />

			<div className="page">
				<Header items={headerItems} />
				<main>{props.children}</main>
				<Footer items={footerItems} />
			</div>
		</>
	)
}
