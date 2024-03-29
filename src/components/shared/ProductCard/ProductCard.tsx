import transparentize from '@/utils/transparentize'
import { Money } from '@shopify/hydrogen-react'
import Image from 'next/image'
import Link from 'next/link'
import {
	ProductPriceRange,
	Image as TImage,
} from '../../../../lib/generated/sdk'
import styles from './ProductCard.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useFilter } from '@/state/filter'

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

	const filter = useFilter()

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
				<ul className={styles['product-card-tags']}>
					{tags
						.filter(tag => tag === filter)
						.map(tag => (
							<motion.li
								layout
								className={`fs-lg ${tag === filter ? styles['active'] : ''}`}
								key={tag}>
								{tag}
							</motion.li>
						))}
				</ul>
				<div
					className={styles['product-thumbnail']}
					style={{
						backgroundColor: transparentize(color, 0.5),
					}}>
					<div className={styles['product-thumbnail-overlay']}>
						<p className="fs-xl">View donut</p>
					</div>
					<div className={styles['image-holder']}>
						<Image
							width={image.width as number}
							height={image.height as number}
							src={image.url}
							alt={title}
						/>
					</div>
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
