import {Link, useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {MediaImage, Product} from '@shopify/hydrogen/storefront-api-types';
import styles from './MainContainer.css';
import {
  ProductCard,
  links as productCardLinks,
} from '../ProductCard/ProductCard';
import {} from '../ProductCard/ProductCard';
import {Filters, links as filterLinks} from '~/components/Filters/Filters';

export const links = () => [
  ...productCardLinks(),
  ...filterLinks(),
  {rel: 'stylesheet', href: styles},
];

interface MainContainerProps {}

export function MainContainer(props: MainContainerProps) {
  const {nodes: products}: {nodes: Product[]} = useLoaderData();

  console.log(products);

  return (
    <div className="main-container">
      <div className="container">
        <h2 className="fs-2xl">
          SHOP DONUTS<sup className="fs-regular fs-md">({products.length})</sup>
        </h2>
        <Filters />
        <div className="product-container">
          {[
            ...products,
            ...products.reverse(),
            ...products,
            ...products.reverse(),
          ].map(
            (
              {
                handle,
                title,
                media,
                options,
                variants: {edges},
                id,
                tags,
                priceRange,
                metafield,
              },
              i,
            ) => (
              <ProductCard
                key={id}
                id={edges[0].node.id}
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
