import { useEffect, useState } from 'react'
import styles from './Filters.module.css'

export const links = () => [{ rel: 'stylesheet', href: styles }]

interface FiltersProps {}

const filters = ['Glazed', 'Chocolate', 'Fruit', 'Filled']
export function Filters(props: FiltersProps) {
	const [activeFilter, setFilter] = useState(-1)

	return (
		<div className={styles['filter-container']}>
			<h2 className="fs-xl">Filters</h2>
			<p>Find the donut that best suits your donut needs</p>
			<ul className={styles['filter-list']}>
				{filters.map((filter, i) => (
					<li key={filter}>
						<button
							data-content={filter}
							className={activeFilter === i ? styles['active'] : ''}
							onClick={() => setFilter(i)}>
							{filter}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
