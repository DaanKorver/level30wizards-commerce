import { MenuItem } from '../../lib/generated/sdk'

export default function sanitizeUrls(items: MenuItem[], domain: string) {
	const _items = items.map(item => {
		if (!item?.url) return item
		item.url = item.url.replace(domain, '')
		return item
	})
	return _items as any[]
}
