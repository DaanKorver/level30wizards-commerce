import { create } from 'zustand'

export interface useCartDrawerT {
	isOpen: boolean
}

export const useCartDrawer = create<useCartDrawerT>(() => ({
	isOpen: false,
}))
