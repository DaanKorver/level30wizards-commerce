import { useCartDrawer } from '@/state/cart'
import styles from './CartDrawer.module.css'
import {
	CartCheckoutButton,
	ShopPayButton,
	useCart,
	useShop,
} from '@shopify/hydrogen-react'
import { MouseEventHandler, useCallback, useEffect, useRef } from 'react'
import { useKey } from 'react-use'
import { Cart, Cross } from '@/components/icons'
import { CartEntry } from './CartEntry'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { easeInOutExpo, easeOutExpo } from '@/utils/transitions'
import { CartLine } from '../../../../lib/generated/sdk'
import disableScroll from '@/utils/disableScroll'
import CartTotals from './CartTotals'
import { CartPromo } from './CartPromo'

interface CartDrawerProps {}

export function CartDrawer(props: CartDrawerProps) {
	const { isOpen } = useCartDrawer()
	const { lines } = useCart()
	const container = useRef<HTMLDivElement>(null)

	useKey('Escape', () => {
		useCartDrawer.setState({ isOpen: false })
	})

	useCartDrawer.subscribe(({ isOpen }) => {
		disableScroll(isOpen)
	})

	const outclick: MouseEventHandler<HTMLDivElement> = e => {
		if (e.target !== container.current) return
		useCartDrawer.setState({ isOpen: false })
	}

	return (
		<>
			<AnimatePresence>
				{isOpen ? (
					<motion.div
						onClick={outclick}
						ref={container}
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						exit={{
							opacity: 0,
						}}
						className={styles['cart-drawer-container']}>
						<motion.div
							className={styles['cart-drawer']}
							transition={{
								duration: 0.65,
								ease: easeOutExpo,
							}}
							initial={{
								x: 100,
								opacity: 0,
							}}
							animate={{
								x: 0,
								opacity: 1,
							}}
							exit={{
								x: 100,
								opacity: 0,
							}}>
							<header>
								<h2 className="fs-xl">Cart</h2>
								<button
									onClick={() => {
										useCartDrawer.setState({ isOpen: false })
									}}>
									<Cross />
								</button>
							</header>
							{lines?.length ? (
								<>
									<motion.ul layout>
										<AnimatePresence>
											{lines?.map(line => (
												<CartEntry key={line?.id} item={line as CartLine} />
											))}
										</AnimatePresence>
									</motion.ul>
									<div className={styles['checkout']}>
										<CartTotals />
										<CartPromo />
										<CartCheckoutButton className="btn">
											Checkout
										</CartCheckoutButton>
									</div>
								</>
							) : (
								<div className={styles['empty']}>
									<p className="fs-xl">Your Cart is empty</p>
									<button
										className="btn fs-sm"
										onClick={() => {
											useCartDrawer.setState({ isOpen: false })
										}}>
										Continue shopping
									</button>
								</div>
							)}
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</>
	)
}
