// Global type augmentation for brain debug helpers

import type {NIfTIVolume} from './NIfTILoader.js'

declare global {
	interface Window {
		updateBrain: (threshold: number, stride: number, pointSize: number, jitter: number) => void
		brainVolume: () => NIfTIVolume | null
		brainStats: () => {min: number; max: number; mean: number} | null
	}
}

export {}
