import {Link} from '@remix-run/react';
import styles from './Header.module.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <header className="navbar">
      <div className="container">
        <Link to="/">Logo</Link>
      </div>
    </header>
  );
}
