import {LoaderArgs} from '@shopify/remix-oxygen';
import styles from './Footer.css';
import {useLoaderData} from '@remix-run/react';
import {MenuItem} from '@shopify/hydrogen/storefront-api-types';
import sanitizeUrls from '~/utils/sanitizeUrls';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface FooterProps {}

export function Footer(props: FooterProps) {
  const {layout} = useLoaderData();

  const {primaryDomain} = layout.shop;

  const exploreItems = sanitizeUrls(layout.explore.items, primaryDomain.url);
  const socialItems = layout.socials.items;
  let legalItems = Object.entries(layout.shop);
  legalItems = legalItems.filter(([key, value]) => {
    return (
      key.toLowerCase().includes('policy') ||
      key.toLowerCase().includes('service')
    );
  });
  const formatedLegalItems = (legalItems as []).map((legal) => {
    const {title, handle} = legal[1];
    return {title, url: `/legal/${handle}`};
  });

  return (
    <footer>
      <div className="container">
        <div className="footer-items">
          <FooterList items={exploreItems} title="Explore" />
          <FooterList items={formatedLegalItems} title="Legal" />
          <FooterList items={socialItems} title="Social" />
        </div>
        <hr className="footer-divider" />
        <div className="footer-underline">
          <p>Copyright Donuts 2023</p>
          <p className="bold">Rounds</p>
        </div>
      </div>
    </footer>
  );
}

function FooterList(props: {
  title: string;
  items: {title: string; url: string}[];
}) {
  const {title, items} = props;

  return (
    <div className="footer-list">
      <h3 className="fs-2xl">{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.url}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
