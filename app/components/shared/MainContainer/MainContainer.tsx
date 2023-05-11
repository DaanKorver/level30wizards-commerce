import styles from './MainContainer.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface MainContainerProps {}

export function MainContainer(props: MainContainerProps) {
  return (
    <div className="main-container">
      <div className="container">
        <h2>Hello container</h2>
      </div>
    </div>
  );
}
