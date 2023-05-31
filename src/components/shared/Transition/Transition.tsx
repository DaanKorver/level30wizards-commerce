import { AnimatePresence } from 'framer-motion'
import styles from './Transition.module.css'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'

interface TransitionProps {
	children: ReactNode
}

const variants = {
	in: {
		opacity: 1,
		transition: {
			duration: 0.3,
		},
	},
	out: {
		opacity: 0,
		transition: {
			delay: 0.15,
			duration: 0.75,
		},
	},
}

export function Transition(props: TransitionProps) {
	const { children } = props
	const { asPath } = useRouter()

	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div
				className="page"
				key={asPath}
				variants={variants}
				initial="out"
				animate="in"
				exit="out">
				{children}
			</motion.div>
		</AnimatePresence>
	)
}
