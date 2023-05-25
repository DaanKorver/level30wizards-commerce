import {
	Image,
	MediaImage,
	Product,
	ProductFragment,
} from '../../../../lib/generated/sdk'
import { Filters } from '../Filters/Filters'
import { ProductCard } from '../ProductCard/ProductCard'
import styles from './MainContainer.module.css'

interface MainContainerProps {
	products: ProductFragment[]
}

export function MainContainer(props: MainContainerProps) {
	const { products } = props

	return (
		<div className={styles['main-container']}>
			<div className="container">
				<h2 className="fs-2xl">
					SHOP DONUTS<sup className="fs-regular fs-md">({products.length})</sup>
				</h2>
				<Filters />
				<div className={styles['product-container']}>
					{products.map(
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
							/>
						)
					)}
				</div>
			</div>
		</div>
	)
}
