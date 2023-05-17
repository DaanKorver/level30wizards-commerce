import {useEffect, useState} from 'react';
import styles from './Filters.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

interface FiltersProps {}

const filters = ['Glazed', 'Chocolate', 'Fruit', 'Filled'];
export function Filters(props: FiltersProps) {
  const [activeFilter, setFilter] = useState(-1);

  useEffect(() => {
    console.log(filters[activeFilter]);
  }, [activeFilter, filters]);

  return (
    <div className="filter-container">
      <h2 className="fs-xl">Filters</h2>
      <p>Find the donut that best suits your donut needs</p>
      <ul className="filter-list">
        {filters.map((filter, i) => (
          <li key={filter}>
            <button
              data-content={filter}
              className={activeFilter === i ? 'active' : ''}
              onClick={() => setFilter(i)}
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
