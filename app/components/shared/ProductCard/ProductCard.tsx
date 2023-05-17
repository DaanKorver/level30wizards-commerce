import {Image} from '@shopify/hydrogen';
import styles from './ProductCard.css';
import {ProductPriceRange} from '@shopify/hydrogen/storefront-api-types';
import formatPrice from '~/utils/formatPrice';
import transparentize from '~/utils/transparentize';
import {Link} from '@remix-run/react';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface ProductCardProps {
  title: string;
  image: string;
  price: ProductPriceRange;
  shortDesc?: string;
  color: string;
  slug: string;
}

export function ProductCard(props: ProductCardProps) {
  const {title, image, price, shortDesc, color, slug} = props;

  return (
    <Link to={`/product/${slug}`} className="product-card">
      <div
        className="product-thumbnail"
        style={{
          backgroundColor: transparentize(color, 0.5),
        }}
      >
        <ul className="product-card-tags">
          <li>Some tag</li>
        </ul>
        <div className="product-thumbnail-overlay">
          <p className="fs-xl">View donut</p>
        </div>
        <Image src={image} alt={title} />
      </div>
      <div className="product-price">
        <h3 className="fs-xl">{title}</h3>
        <p className="fs-lg">
          {formatPrice(
            Number(price.minVariantPrice.amount),
            price.minVariantPrice.currencyCode,
          )}
        </p>
      </div>
      <p>{shortDesc}</p>
    </Link>
  );
}
