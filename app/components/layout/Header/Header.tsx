import {Link, useLoaderData} from '@remix-run/react';
import {MenuItem} from '@shopify/hydrogen/storefront-api-types';
import {useCallback, useEffect, useState} from 'react';
import {useLocation, useMedia} from 'react-use';
import {Cart, Cross, Menu, User} from '~/components/icons';
import styles from './Header.module.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface HeaderProps {}

export function Header(props: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  const [hamburger, setHamburger] = useState(false);
  const isMobile = useMedia('(max-width: 768px)');
  const location = useLocation();

  const {layout} = useLoaderData();

  const {name, primaryDomain} = layout.shop;
  let {items}: {items: MenuItem[]} = layout.menu;
  items = items.map((item) => {
    if (!item.url) return item;
    item.url = item.url.replace(primaryDomain.url, '');
    return item;
  });

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > window.innerHeight * 0.8);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setScrolled(true);
      return;
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [location.pathname, onScroll]);

  return (
    <header className={`navbar ${scrolled ? 'active' : ''}`}>
      <nav className="container">
        <b className="logo">
          <Link to="/">Rounds</Link>
        </b>
        <ul
          aria-hidden={!hamburger}
          className={`${isMobile && hamburger ? 'open' : ''}`}
        >
          {items.map(({title, url}, i) => (
            <li key={`item-${i}`}>
              <Link
                tabIndex={!hamburger ? -1 : 0}
                aria-disabled={!hamburger}
                to={url as string}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={() => setHamburger(!hamburger)}>
          {hamburger ? <Cross /> : <Menu />}
        </button>
        <div className="nav__icons">
          <Link to="/">
            <User />
          </Link>
          <Link to="/">
            <Cart />
          </Link>
        </div>
      </nav>
    </header>
  );
}
