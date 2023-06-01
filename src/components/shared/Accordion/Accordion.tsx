import { ReactNode, useState } from 'react'
import styles from './Accordion.module.css'
import {AnimatePresence, motion} from 'framer-motion'

interface AccordionProps {
	title: string;
	children: ReactNode;
}

export function Accordion(props: AccordionProps) {
	const { title, children } = props;

	const [isOpen, setIsOpen] = useState(false)

	const toggle = ()=> {
		setIsOpen(!isOpen)
	}
	
	return <div className={styles['accordion-container']}>
	<button onClick={toggle}>{title}</button>
	<AnimatePresence initial={false}>
		{isOpen && (
			<motion.section
			
			initial="closed"
			animate="open"
			exit="closed"
			variants={{
				open: { height: 'auto'},
				closed: {height: 0}
			}}
			>
				{children}
			</motion.section>
		)}
	</AnimatePresence>
	</div>
}