import transparentize from '@/utils/transparentize'
import {
	Image as TImage,
	ProductPriceRange,
} from '../../../../lib/generated/sdk'
import styles from './ProductCard.module.css'
import formatPrice from '@/utils/formatPrice'
import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
	title: string
	image: TImage
	price: Pick<ProductPriceRange, 'minVariantPrice'>
	shortDesc?: string
	color: string
	slug: string
}

export function ProductCard(props: ProductCardProps) {
	const { title, image, price, shortDesc, color, slug } = props

	return (
		<Link href={`/product/${slug}`} className={styles['product-card']}>
			<div
				className={styles['product-thumbnail']}
				style={{
					backgroundColor: transparentize(color, 0.5),
				}}>
				<ul className={styles['product-card-tags']}>
					<li>Some tag</li>
				</ul>
				<div className={styles['product-thumbnail-overlay']}>
					<p className="fs-xl">View donut</p>
				</div>
				<Image
					width={image.width as number}
					height={image.height as number}
					src={image.url}
					alt={title}
				/>
			</div>
			<div className={styles['product-price']}>
				<h3 className="fs-xl">{title}</h3>
				<p className="fs-lg">
					{formatPrice(
						Number(price.minVariantPrice.amount),
						price.minVariantPrice.currencyCode
					)}
				</p>
			</div>
			<p>{shortDesc}</p>
		</Link>
	)
}
