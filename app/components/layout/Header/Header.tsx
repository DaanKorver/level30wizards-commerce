import {Link} from '@remix-run/react';
import {MenuItem} from '@shopify/hydrogen-react/storefront-api-types';
import {useCallback, useEffect, useState} from 'react';
import {useMedia} from 'react-use';
import {Cart, Cross, Menu, User} from '~/components/icons';
import styles from './Header.module.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface HeaderProps {
  items: Pick<MenuItem, 'title' | 'url'>[];
}

export function Header(props: HeaderProps) {
  const {items} = props;
  const [scrolled, setScrolled] = useState(false);

  const [hamburger, setHamburger] = useState(false);
  const isMobile = useMedia('(max-width: 768px)');

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > window.innerHeight * 0.8);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

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
