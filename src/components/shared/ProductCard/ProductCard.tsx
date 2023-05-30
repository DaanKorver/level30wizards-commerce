import transparentize from '@/utils/transparentize'
import { Money } from '@shopify/hydrogen-react'
import Image from 'next/image'
import Link from 'next/link'
import {
	ProductPriceRange,
	Image as TImage,
} from '../../../../lib/generated/sdk'
import styles from './ProductCard.module.css'
import { motion } from 'framer-motion'

interface ProductCardProps {
	title: string
	image: TImage
	price: Pick<ProductPriceRange, 'minVariantPrice'>
	shortDesc?: string
	color: string
	slug: string
	tags: string[]
}

export function ProductCard(props: ProductCardProps) {
	const { title, image, price, shortDesc, color, slug, tags } = props

	return (
		<motion.div
			layout
			initial={{
				opacity: 0,
				y: -10,
			}}
			animate={{
				opacity: 1,
				y: 0,
			}}
			exit={{
				opacity: 0,
				y: 10,
			}}>
			<Link href={`/product/${slug}`} className={styles['product-card']}>
				<div
					className={styles['product-thumbnail']}
					style={{
						backgroundColor: transparentize(color, 0.5),
					}}>
					<ul className={styles['product-card-tags']}>
						{tags.map(tag => (
							<li className="fs-xs" key={tag}>
								{tag}
							</li>
						))}
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
					<Money data={price.minVariantPrice} className="fs-lg" />
				</div>
				<p>{shortDesc}</p>
			</Link>
		</motion.div>
	)
}
