import styles from './Hero.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface HeroProps {}

export function Hero(props: HeroProps) {
  return (
    <div className="hero center">
      <div className="container center">
        <h1>
          <span>Enjoy tasty</span>Donuts<span>Made with love</span>
        </h1>
      </div>
      <img src="/images/hero.png" alt="" />
    </div>
  );
}
