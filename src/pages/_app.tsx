import { BaseLayout } from '@/components/layout/BaseLayout/BaseLayout'
import '@/styles/app.css'
import '@/styles/fonts.css'
import '@/styles/media.css'
import '@/styles/normalize.css'
import '@/styles/typography.css'
import '@/styles/variables.css'
import Lenis from '@studio-freight/lenis'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { GetLayoutQuery } from '../../lib/generated/sdk'
import { CartProvider, ShopifyProvider } from '@shopify/hydrogen-react'
import { PageTransition } from '@/components/shared/PageTransition/PageTransition'

export default function App({
	Component,
	pageProps,
}: AppProps & {
	layout: GetLayoutQuery
}) {
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1,
			easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
			orientation: 'vertical', // vertical, horizontal
			gestureOrientation: 'vertical', // vertical, horizontal, both
			smoothWheel: true,
			smoothTouch: false,
			infinite: false,
		})
		window.Lenis = lenis

		let rAF: number
		function raf(time: number) {
			lenis.raf(time)
			rAF = requestAnimationFrame(raf)
		}
		rAF = requestAnimationFrame(raf)

		return () => {
			rAF = requestAnimationFrame(raf)
			lenis?.destroy()
		}
	}, [])

	return (
		<ShopifyProvider
			storeDomain={`https://${process.env.NEXT_PUBLIC_STORE_DOMAIN as string}`}
			storefrontToken={process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN as string}
			storefrontApiVersion={
				process.env.NEXT_PUBLIC_STOREFRONT_API_VERSION as string
			}
			countryIsoCode="NL"
			languageIsoCode="EN">
			<CartProvider>
				<PageTransition />
				<BaseLayout layout={pageProps.layout}>
					<Component {...pageProps} />
				</BaseLayout>
			</CartProvider>
		</ShopifyProvider>
	)
}
