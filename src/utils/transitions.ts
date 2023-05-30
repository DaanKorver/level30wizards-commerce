export function easeInOutExpo(x: number): number {
	return x === 0
		? 0
		: x === 1
		? 1
		: x < 0.5
		? Math.pow(2, 20 * x - 10) / 2
		: (2 - Math.pow(2, -20 * x + 10)) / 2
}

export function easeInExpo(x: number): number {
	return x === 0 ? 0 : Math.pow(2, 10 * x - 10)
}

export function easeOutExpo(x: number): number {
	return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}

export const QuartOut = {
	duration: 0.5,
	ease: [0.16, 1, 0.3, 1],
}
