import { useEffect, useState } from 'react'
import styles from './Filters.module.css'
import { useFilter } from '@/state/filter'
import { ProductTagsFragment } from '../../../../lib/generated/sdk'

export const links = () => [{ rel: 'stylesheet', href: styles }]

interface FiltersProps {
	tags: ProductTagsFragment['edges']
}

export function Filters(props: FiltersProps) {
	const { tags } = props
	const filters = tags.map(tag => tag.node)

	const [activeFilter, setFilter] = useState(-1)

	useEffect(() => {
		useFilter.setState(activeFilter > -1 ? filters[activeFilter] : '')
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
								onClick={() => {
									setFilter(activeFilter === i ? -1 : i)
								}}>
								{filter}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
