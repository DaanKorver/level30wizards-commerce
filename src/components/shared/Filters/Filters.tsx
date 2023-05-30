import { useEffect, useState } from 'react'
import styles from './Filters.module.css'
import { useFilter } from '@/state/filter'

export const links = () => [{ rel: 'stylesheet', href: styles }]

interface FiltersProps {}

const filters = ['Glazed', 'Chocolate', 'Fruit', 'Filled', 'Sprinkles']
export function Filters(props: FiltersProps) {
	const [activeFilter, setFilter] = useState(-1)

	useEffect(() => {
		if (activeFilter > -1) {
			useFilter.setState(filters[activeFilter])
		}
	}, [activeFilter])

	return (
		<div className={styles['filter-container']}>
			<h2 className="fs-xl">Filters</h2>
			<p>Find the donut that best suits your donut needs</p>
			<div className={styles['filter-list']}>
				<ul>
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
		</div>
	)
}
