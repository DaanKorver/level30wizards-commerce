import styles from './Hero.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface HeroProps {}

export function Hero(props: HeroProps) {
  return <div class="hero">x</div>;
}
