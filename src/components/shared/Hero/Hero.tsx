import styles from './Hero.module.css'
import { motion } from 'framer-motion'

interface HeroProps {}

export function Hero(props: HeroProps) {
	return (
		<div className={`${styles.hero} hero center`}>
			<div className="container center">
				<motion.h1
				transition={{
					delay: .3,
					duration: 0.6,
					type: "spring",
					// ease: 'backOut',
					bounce: 0.5,
					stiffness: 300
					// bounceStiffness: 500,
					// damping: 500
				}}
					initial={{
						opacity: 0,
						y: 20
					}}
					animate={{
						opacity: 1,
						y: 0
					}}
				>
					<span>Enjoy tasty</span>Donuts<span>Made with love</span>
				</motion.h1>
			</div>
			<img src="/images/hero.png" alt="" />
		</div>
	)
}
