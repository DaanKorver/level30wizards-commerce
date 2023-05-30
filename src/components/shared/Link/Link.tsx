import { ReactNode } from 'react'
import styles from './Link.module.css'
import { LinkProps as NextLinkProps, default as NextLink } from 'next/link'
import { usePageTransition } from '../PageTransition/pageTransition'

type LinkProps = NextLinkProps &
	React.RefAttributes<HTMLAnchorElement> & {
		noTransition?: boolean
		children: ReactNode
	} & React.HTMLAttributes<HTMLAnchorElement>

export function Link(props: LinkProps) {
	const { noTransition, children, ...rest } = props
	return (
		<NextLink
			onClick={e => {
				if (!noTransition) {
					e.preventDefault()
					usePageTransition.setState({ triggerTransition: props.href })
				}
				props?.onClick && props.onClick(e)
			}}
			{...rest}>
			{children}
		</NextLink>
	)
}
