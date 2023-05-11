import styles from './COMPONENT.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface COMPONENTProps {}

export function COMPONENT(props: COMPONENTProps) {
  return <h1>Hello world</h1>;
}
