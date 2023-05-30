import { CartCost, Money, useCart } from '@shopify/hydrogen-react'
import { CurrencyCode } from '@shopify/hydrogen-react/storefront-api-types'
import styles from './CartDrawer.module.css'

export default function CartTotals() {
	const { cost } = useCart()

	const discount = {
		amount: (
			Number(cost?.subtotalAmount?.amount) - Number(cost?.totalAmount?.amount)
		).toFixed(2),
		currencyCode: cost?.totalAmount?.currencyCode as CurrencyCode,
	}

	return (
		<div className={styles['totals']}>
			<div>
				Subtotal: <CartCost amountType="subtotal" />
			</div>
			{Number(discount.amount) ? (
				<div>
					Discount: <Money data={discount} />
				</div>
			) : null}
			<div>
				Total: <CartCost />
			</div>
		</div>
	)
}
