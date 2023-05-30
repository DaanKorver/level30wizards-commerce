export default function disableScroll(disabled: boolean) {
	disabled ? window.Lenis.stop() : window.Lenis.start()
	document.body.style.setProperty('overflow', disabled ? 'hidden' : 'initial')
}
