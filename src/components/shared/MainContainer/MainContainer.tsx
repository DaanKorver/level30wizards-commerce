import { useFilter } from '@/state/filter'
import {
	Image,
	MediaImage,
	Product,
	ProductFragment,
} from '../../../../lib/generated/sdk'
import { Filters } from '../Filters/Filters'
import { ProductCard } from '../ProductCard/ProductCard'
import styles from './MainContainer.module.css'
import { AnimatePresence } from 'framer-motion'

interface MainContainerProps {
	products: ProductFragment[]
}

export function MainContainer(props: MainContainerProps) {
	const { products } = props
	const filter = useFilter()

	console.log(filter, products)

	return (
		<div className={styles['main-container']}>
			<div className="container">
				<h2 className="fs-2xl">
					SHOP DONUTS<sup className="fs-regular fs-md">({products.length})</sup>
				</h2>
				<Filters />
				<div className={styles['product-container']}>
					<AnimatePresence>
						{products
							.filter(product => {
								return !filter ? true : product.tags.includes(filter)
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
