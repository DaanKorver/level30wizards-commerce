import styles from './Footer.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <footer className="container">
      <h3>Footer</h3>
    </footer>
  );
}
