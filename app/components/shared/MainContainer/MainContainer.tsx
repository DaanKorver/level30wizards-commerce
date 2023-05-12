import {Link, useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {MediaImage, Product} from '@shopify/hydrogen/storefront-api-types';
import styles from './MainContainer.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface MainContainerProps {}

export function MainContainer(props: MainContainerProps) {
  const {nodes: products}: {nodes: Product[]} = useLoaderData();

  return (
    <div className="main-container">
      <div className="container">
        <h2>Hello container</h2>
        {products.map(({handle, title, media, options, id, tags}, i) => (
          <li key={id}>
            <h2>{title}</h2>
            <Image
              src={(media.nodes[0] as MediaImage).image?.url}
              width={300}
            />
            <div>
              <b>Tags</b>
              <ul>
                {tags.map((tag) => (
                  <li key={`tag-${tag}`}>{tag}</li>
                ))}
              </ul>
              <b>Options</b>
              <ul>
                {options[0].values.map((option) => (
                  <li key={`option-${option}`}>{option}</li>
                ))}
              </ul>
              <Link to={`/product/${handle}`}>Preview</Link>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}
