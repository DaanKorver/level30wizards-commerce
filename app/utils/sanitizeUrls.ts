import {MenuItem} from '@shopify/hydrogen/storefront-api-types';

export default function sanitizeUrls(items: any[], domain: string) {
  const _items = (items as MenuItem[]).map((item) => {
    if (!item?.url) return item;
    item.url = item.url.replace(domain, '');
    return item;
  });
  return _items as any[];
}
