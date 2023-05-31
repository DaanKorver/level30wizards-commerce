import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './PageTransition.module.css'
import {
	MotionValue,
	motion,
	useAnimationControls,
	useMotionTemplate,
	useMotionValue,
} from 'framer-motion'
import { usePageTransition } from './pageTransition'
import { useRouter } from 'next/router'
import { useIsomorphicLayoutEffect, useLocation } from 'react-use'
import { QuartOut } from '@/utils/transitions'
import Image from 'next/image'

const variants = {
	visible: {
		clipPath: 'inset(0% 0% 0% 0%)',
	},
	hidden: {
		clipPath: 'inset(0% 0% 0% 100%)',
	},
}

export function PageTransition() {
	const curtainRef = useRef<HTMLDivElement>(null)
	const router = useRouter()
	const [pageLoaded, setPageloaded] = useState(false)
	const [inTransition, setInTranstion] = useState(false)
	const { triggerTransition } = usePageTransition()
	const controls = useAnimationControls()
	const { pathname } = useLocation()

	const [path, setPath] = useState(pathname)

	useEffect(() => {
		const onStart = (e: string) => {
			if (e == path) return

			setInTranstion(true)
			controls.start('visible')
			document.body.style.setProperty('--page', '0')
		}

		const changeRouteComplete = (e: string) => {
			setPath(pathname)
			setTimeout(() => {
				controls.start('hidden')
				document.body.style.setProperty('--page', '1')
				setInTranstion(false)
			}, 500)
		}
		router.events.on('routeChangeStart', onStart)
		router.events.on('routeChangeComplete', changeRouteComplete)
		return () => {
			router.events.off('routeChangeStart', onStart)

			router.events.off('routeChangeComplete', changeRouteComplete)
		}
	}, [controls, pageLoaded, path, pathname, router.events])

	return (
		<motion.div
			animate={controls}
			variants={variants}
			transition={{
				...QuartOut,
				delay: 0.15,
				duration: 0.75,
			}}
			className={styles['page-transition']}
			ref={curtainRef}
			onAnimationComplete={(e: any) => {
				if (!inTransition) {
					controls.set({
						clipPath: 'inset(0% 100% 0% 0%)',
					})
				}
			}}>
			<motion.div
				transition={{
					ease: 'linear',
					repeatType: 'loop',
					repeat: Infinity,
					duration: 0.7,
				}}
				animate={{
					rotate: 360,
				}}>
				<Image src="/images/donut.png" alt="" width={300} height={299} />
			</motion.div>
		</motion.div>
	)
}
