import {
	CartLineProvider,
	CartLineQuantity,
	CartLineQuantityAdjustButton,
	Money,
	useCart,
} from '@shopify/hydrogen-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CartLine } from '../../../../lib/generated/sdk'
import styles from './CartDrawer.module.css'

interface CartEntryProps {
	item: CartLine
}

export function CartEntry(props: CartEntryProps) {
	const {
		item: { merchandise, quantity, id },
	} = props

	const { image, price, product, selectedOptions } = merchandise

	const { linesRemove } = useCart()

	return (
		<CartLineProvider line={props.item}>
			<motion.li
				layout
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{
					y: 20,
					opacity: 0,
					transition: {
						duration: 0.3,
					},
				}}
				className={styles['entry']}>
				<Image
					width={image?.width as number}
					height={image?.height as number}
					src={image?.url}
					alt={merchandise.title}
				/>
				<div>
					<div className={styles['entry-title']}>
						<p>{product.title}</p>
						<Money data={price} />
					</div>
					{selectedOptions.map(option => (
						<p className="fs-sm" key={option.value}>
							{option.name}: {option.value}
						</p>
					))}
					<div className={styles['quantity']}>
						<CartLineQuantityAdjustButton adjust="decrease">
							-
						</CartLineQuantityAdjustButton>
						<p className="fs-xs">
							Qty: <CartLineQuantity />
						</p>
						<CartLineQuantityAdjustButton adjust="increase">
							+
						</CartLineQuantityAdjustButton>
					</div>
					<CartLineQuantityAdjustButton adjust="remove">
						Remove from cart
					</CartLineQuantityAdjustButton>
				</div>
			</motion.li>
		</CartLineProvider>
	)
}
