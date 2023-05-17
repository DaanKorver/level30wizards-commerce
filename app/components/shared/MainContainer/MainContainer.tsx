import {Link, useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {MediaImage, Product} from '@shopify/hydrogen/storefront-api-types';
import styles from './MainContainer.css';
import {
  ProductCard,
  links as productCardLinks,
} from '../ProductCard/ProductCard';
import {} from '../ProductCard/ProductCard';

export const links = () => [
  ...productCardLinks(),
  {rel: 'stylesheet', href: styles},
];

interface MainContainerProps {}

export function MainContainer(props: MainContainerProps) {
  const {nodes: products}: {nodes: Product[]} = useLoaderData();

  return (
    <div className="main-container">
      <div className="container">
        <h2 className="fs-2xl">
          SHOP DONUTS<sup className="fs-regular fs-md">({products.length})</sup>
        </h2>
        <div className="product-container">
          {[
            ...products,
            ...products.reverse(),
            ...products,
            ...products.reverse(),
          ].map(
            (
              {handle, title, media, options, id, tags, priceRange, metafield},
              i,
            ) => (
              <ProductCard
                key={id}
                title={title}
                image={(media.nodes[0] as MediaImage).image?.url as string}
                price={priceRange}
                shortDesc=""
                color={metafield?.value as string}
                slug={handle}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
