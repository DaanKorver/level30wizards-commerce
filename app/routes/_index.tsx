import {cssBundleHref} from '@remix-run/css-bundle';
import {Product} from '@shopify/hydrogen/storefront-api-types';
import {LinksFunction, LoaderArgs} from '@shopify/remix-oxygen';
import {Hero, links as heroLinks} from '~/components/shared/Hero/Hero';
import {
  MainContainer,
  links as mainContainerLinks,
} from '~/components/shared/MainContainer/MainContainer';

export function meta() {
  return [
    {title: 'Hydrogen'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{rel: 'stylesheet', href: cssBundleHref}] : []),
    ...heroLinks(),
    ...mainContainerLinks(),
  ];
};

export async function loader({context: {storefront}}: LoaderArgs) {
  const {products} = await storefront.query<{products: Product[]}>(
    `
  #graphql
  query getCollections {
    products(first: 3) {
      nodes {
        id
        handle
        title
        handle
        options(first: 3) {
          name
          values
        }
        tags
        media(first: 1) {
          nodes {
            ... on MediaImage {
              image {
                id
                url
                altText
                width
                height
              }
            }
          }
        }
      }
  
    }
  }
  `,
  );
  return products;
}

export default function Index() {
  return (
    <div>
      <Hero />
      <MainContainer />
    </div>
  );
}
