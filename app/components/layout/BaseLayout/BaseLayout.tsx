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
  children: ReactNode;
}

export function BaseLayout(props: BaseLayoutProps) {
  const {children} = props;
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
}
