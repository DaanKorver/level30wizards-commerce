export default function formatPrice(price: number, currencyCode: string) {
	return new Intl.NumberFormat('nl-NL', {
		style: 'currency',
		currency: currencyCode,
	}).format(price)
}
