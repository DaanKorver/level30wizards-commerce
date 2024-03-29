import transparentize from '@/utils/transparentize'
import { AddToCartButton, BuyNowButton, Money } from '@shopify/hydrogen-react'
import Image from 'next/image'
import { useState } from 'react'
import { MediaImage, ProductFragment } from '../../../../lib/generated/sdk'
import styles from './SingleProduct.module.css'

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
					backgroundColor: transparentize(item.metafield?.value as string, 0.5),
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
				<Money
					as="b"
					data={item.priceRange.minVariantPrice}
					className="fs-xl"
				/>
				<br />
				<p>Select variant</p>
				<div className={styles['variants']}>
					{variants.map(variant => (
						<button
							className={`btn ${
								selectedVariant === variant.node.id ? 'active' : ''
							}`}
							key={variant.node.id}
							onClick={() => setVariant(variant.node.id)}>
							{variant.node.title}
						</button>
					))}
				</div>
				<br />
				<AddToCartButton
					disabled={!selectedVariant}
					variantId={selectedVariant as string}>
					Add to cart
				</AddToCartButton>

				<BuyNowButton
					disabled={!selectedVariant}
					variantId={selectedVariant as string}>
					Buy now
				</BuyNowButton>
			</div>
		</div>
	)
}
