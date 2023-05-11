import {MenuItem} from '@shopify/hydrogen-react/storefront-api-types';
import {ReactNode} from 'react';
import {Footer, links as footerLinks} from '../Footer/Footer';
import {Header, links as headerLinks} from '../Header/Header';
import styles from './BaseLayout.css';

export const links = () => [
  {rel: 'stylesheet', href: styles},
  ...headerLinks(),
  ...footerLinks(),
];

interface BaseLayoutProps {
  items: Pick<MenuItem, 'title' | 'url'>[];
  children: ReactNode;
}

export function BaseLayout(props: BaseLayoutProps) {
  const {items, children} = props;
  return (
    <>
      <Header items={items} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
