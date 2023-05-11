import styles from './Hero.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface HeroProps {}

export function Hero(props: HeroProps) {
  return (
    <div className="hero">
      <div className="container">
        <h1>Content</h1>
      </div>
    </div>
  );
}
