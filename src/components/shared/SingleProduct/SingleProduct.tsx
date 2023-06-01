import transparentize from '@/utils/transparentize'
import { AddToCartButton, BuyNowButton, Money, useProduct } from '@shopify/hydrogen-react'
import Image from 'next/image'
import { useState } from 'react'
import { MediaImage, ProductFragment } from '../../../../lib/generated/sdk'
import styles from './SingleProduct.module.css'
import { Accordion } from '../Accordion/Accordion'

interface SingleProductProps {
	item: ProductFragment
}

export function SingleProduct(props: SingleProductProps) {
	const { item } = props
	const image = (item?.media.nodes as MediaImage[])[0].image
	const variants = item.variants.edges

	const [selectedVariant, setVariant] = useState<string | null>(null)

	return (
		<div className={styles['single-product']}>
			<div
				className={styles['thumb']}
				style={{
					backgroundColor: transparentize(item.accent?.value as string, 0.5),
				}}>
				<Image
					width={image?.width as number}
					height={image?.height as number}
					src={image?.url}
					alt={item.title}
					priority
				/>
			</div>
			<div className={styles['single-product-info']}>
				<h1 className="fs-2xl">{item.title}</h1>
				<p className="fs-sm">{item.description}</p>
				<Money data={item.priceRange.minVariantPrice} className="fs-2xl" />
				<br />
				<hr />
				<p className="fs-lg">Select amount</p>
				<div className={styles['variants']}>
					{variants.map(variant => (
						<button
							className={`btn ghost ${
								selectedVariant === variant.node.id ? 'active' : ''
							}`}
							key={variant.node.id}
							onClick={() => setVariant(variant.node.id)}>
							{variant.node.title}
						</button>
					))}
				</div>
				<br />
				<div className={styles['buy-buttons']}>
					<AddToCartButton
						className="btn"
						disabled={!selectedVariant}
						variantId={selectedVariant as string}>
						Add to cart
					</AddToCartButton>

					<BuyNowButton
						className="btn"
						disabled={!selectedVariant}
						variantId={selectedVariant as string}>
						Buy now
					</BuyNowButton>
				</div>

				<Accordion title="Ingredients">
					<ul>
						{(JSON.parse(item.ingredients?.value as string) as string[]).map(ingredient => (
							<li key={ingredient}>{ingredient}</li>
						))}
					</ul>
				</Accordion>
				
			</div>
		</div>
	)
}
