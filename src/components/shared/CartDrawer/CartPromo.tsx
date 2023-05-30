import { useCallback, useRef } from 'react'
import styles from './CartDrawer.module.css'
import { useCart } from '@shopify/hydrogen-react'
import { Cross, Tag } from '@/components/icons'

export function CartPromo() {
	const discountRef = useRef<HTMLInputElement>(null)
	const { discountCodesUpdate, discountCodes, cost } = useCart()

	const applyDiscount = useCallback(() => {
		if (!discountRef.current) return

		const value = discountRef.current.value
		if (!value) return

		discountCodesUpdate([value])
	}, [discountCodesUpdate])

	return (
		<>
			{discountCodes?.length ? (
				<>
					{discountCodes.map(code => (
						<button
							className={styles['promo-code']}
							key={code?.code}
							onClick={() => {
								discountCodesUpdate([])
							}}>
							<Tag />
							{code?.code}
							<Cross />
						</button>
					))}
				</>
			) : null}
			<div className={styles['discount']}>
				<input
					type="text"
					placeholder="Enter promo code..."
					ref={discountRef}
				/>

				<button className="btn" onClick={applyDiscount}>
					Apply promo
				</button>
			</div>
		</>
	)
}
