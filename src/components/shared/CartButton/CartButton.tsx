import { Cart } from '@/components/icons'
import styles from './CartButton.module.css'
import { useCart } from '@shopify/hydrogen-react'
import { useCallback, useEffect } from 'react'
import { useCartDrawer } from '@/state/cart'

interface CartButtonProps {}

export function CartButton(props: CartButtonProps) {
	const { totalQuantity } = useCart()
	const { isOpen } = useCartDrawer()

	const toggle = useCallback(() => {
		useCartDrawer.setState(state => {
			return { isOpen: !state.isOpen }
		})
	}, [])

	return (
		<button onClick={toggle} className={styles['cart-button']}>
			<span className="fs-xs">{totalQuantity}</span>
			<Cart />
		</button>
	)
}
