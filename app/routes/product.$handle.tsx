import {useLoaderData} from '@remix-run/react';
import {Product} from '@shopify/hydrogen/storefront-api-types';
import {LoaderArgs} from '@shopify/remix-oxygen';

export const loader = async ({params, context: {storefront}}: LoaderArgs) => {
  const {productByHandle} = await storefront.query<{productByHandle: Product}>(
    `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      title
    }
  }
  `,
    {
      variables: {
        handle: params.handle,
      },
    },
  );
  return productByHandle;
};

export default function ProductRoute() {
  const {title} = useLoaderData();
  console.log(title);

  return (
    <div className="container" style={{paddingTop: '70px'}}>
      <h1>{title}</h1>
    </div>
  );
}
