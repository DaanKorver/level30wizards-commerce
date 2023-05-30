import { useCallback, useEffect, useState } from 'react'
import styles from './Header.module.css'
import { useLocation, useMedia } from 'react-use'
import Link from 'next/link'
import { Cart, Cross, Menu, User } from '@/components/icons'
import { CartButton } from '@/components/shared/CartButton/CartButton'
import { CartDrawer } from '@/components/shared/CartDrawer/CartDrawer'

interface HeaderProps {
	items: { title: string; url: string }[]
}

export function Header(props: HeaderProps) {
	const { items } = props

	const [scrolled, setScrolled] = useState(false)

	const [hamburger, setHamburger] = useState(false)
	const isMobile = useMedia('(max-width: 768px)', false)
	const location = useLocation()

	const onScroll = useCallback(() => {
		setScrolled(window.scrollY > window.innerHeight * 0.8)
	}, [])

	useEffect(() => {
		if (location.pathname !== '/') {
			setScrolled(true)
			return
		}

		setScrolled(window.scrollY > window.innerHeight * 0.8)

		window.addEventListener('scroll', onScroll)

		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [location.pathname, onScroll])

	return (
		<header
			className={`${styles['navbar']} ${scrolled ? styles['active'] : ''}`}>
			<nav className="container">
				<b className={styles['logo']}>
					<Link href="/">Rounds</Link>
				</b>
				<ul
					aria-hidden={!hamburger}
					className={`${isMobile && hamburger ? styles['open'] : ''}`}>
					{items.map(({ title, url }, i) => (
						<li key={url}>
							<Link
								tabIndex={!hamburger ? -1 : 0}
								aria-disabled={!hamburger}
								href={url as string}>
								{title}
							</Link>
						</li>
					))}
				</ul>
				<button
					className={styles['hamburger']}
					onClick={() => setHamburger(!hamburger)}>
					{hamburger ? <Cross /> : <Menu />}
				</button>
				<div className={styles['nav__icons']}>
					<CartButton />
				</div>
			</nav>
		</header>
	)
}
