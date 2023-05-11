import styles from './Footer.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <footer>
      <div className="container">
        <h3>Footer</h3>
      </div>
    </footer>
  );
}
