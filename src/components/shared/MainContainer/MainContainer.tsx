import { useFilter } from '@/state/filter'
import {
	Image,
	MediaImage,
	Product,
	ProductFragment,
	ProductTagsFragment,
} from '../../../../lib/generated/sdk'
import { Filters } from '../Filters/Filters'
import { ProductCard } from '../ProductCard/ProductCard'
import styles from './MainContainer.module.css'
import { AnimatePresence } from 'framer-motion'

interface MainContainerProps {
	products: ProductFragment[]
	tags: ProductTagsFragment['edges']
}

export function MainContainer(props: MainContainerProps) {
	const { products, tags } = props
	const filter = useFilter()

	return (
		<div className={styles['main-container']}>
			<div className="container">
				<h2 className="fs-2xl">
					SHOP DONUTS<sup className="fs-regular fs-md">({products.length})</sup>
				</h2>
				<Filters tags={tags} />
				<div className={styles['product-container']}>
					<AnimatePresence>
						{products
							// .filter(product => {
							// 	return !filter ? true : product.tags.includes(filter)
							// })
							.sort((a, b) => {
								const aHasTag = a.tags.includes(filter)
								const bHasTag = b.tags.includes(filter)

								if (aHasTag && !bHasTag) {
									return -1 // a comes before b
								} else if (!aHasTag && bHasTag) {
									return 1 // b comes before a
								} else {
									return 0 // leave the order unchanged
								}
							})
							.map(
								(
									{
										handle,
										title,
										media,
										options,
										id,
										tags,
										priceRange,
										metafield,
									},
									i
								) => (
									<ProductCard
										key={id}
										title={title}
										image={(media.nodes as MediaImage[])[0].image as Image}
										price={priceRange}
										shortDesc=""
										color={metafield?.value as string}
										slug={handle}
										tags={tags}
									/>
								)
							)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	)
}
