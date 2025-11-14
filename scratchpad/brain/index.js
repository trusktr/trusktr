// data from https://github.com/aces/brainbrowser/blob/master/examples/models/
// and example of alternate brain scan viewer at https://github.com/aces/brainbrowser/blob/master/examples/volume-viewer-demo.js

import 'lume'
import * as THREE from 'three'
import {NIfTILoader} from './NIfTILoader.js'
/** @import {Scene, Points, ClipPlane} from 'lume' */

const structuralNiiUrl =
	'https://rawcdn.githack.com/trusktr/assets/7a702b50bba23d87061709c350c57427d8fa80d2/scratchpad/brain/data/structural.nii.gz'

const scene = /** @type {Scene} */ (document.querySelector('lume-scene'))
const pointsElement = /** @type {Points} */ (document.querySelector('#brain-points'))
const clipPlane1 = /** @type {ClipPlane} */ (document.querySelector('#clip1'))
const clipPlane2 = /** @type {ClipPlane} */ (document.querySelector('#clip2'))

/** @type {import('./NIfTILoader.js').NIfTIVolume|null} */
let volume = null
/** @type {{min:number,max:number,mean:number}|null} */
let stats = null

// Bounding box for the point cloud
let boundingBox = {min: {x: 0, y: 0, z: 0}, max: {x: 0, y: 0, z: 0}}

// UI elements
/** @type {HTMLInputElement} */ let thresholdSlider
/** @type {HTMLInputElement} */ let strideSlider
/** @type {HTMLInputElement} */ let sizeSlider
/** @type {HTMLInputElement} */ let jitterSlider
/** @type {HTMLInputElement} */ let slicePositionSlider
/** @type {HTMLInputElement} */ let sliceThicknessSlider
/** @type {HTMLElement} */ let thresholdValue
/** @type {HTMLElement} */ let strideValue
/** @type {HTMLElement} */ let sizeValue
/** @type {HTMLElement} */ let jitterValue
/** @type {HTMLElement} */ let slicePositionValue
/** @type {HTMLElement} */ let sliceThicknessValue
/** @type {HTMLElement} */ let pointCountEl
/** @type {HTMLElement} */ let volumeDimsEl
/** @type {HTMLElement} */ let dataRangeEl

// Wait for DOM to be ready
function initUI() {
	thresholdSlider = /** @type {HTMLInputElement} */ (document.querySelector('#threshold'))
	strideSlider = /** @type {HTMLInputElement} */ (document.querySelector('#stride'))
	sizeSlider = /** @type {HTMLInputElement} */ (document.querySelector('#point-size'))
	jitterSlider = /** @type {HTMLInputElement} */ (document.querySelector('#jitter'))
	slicePositionSlider = /** @type {HTMLInputElement} */ (document.querySelector('#slice-position'))
	sliceThicknessSlider = /** @type {HTMLInputElement} */ (document.querySelector('#slice-thickness'))

	thresholdValue = /** @type {HTMLElement} */ (document.querySelector('#threshold-value'))
	strideValue = /** @type {HTMLElement} */ (document.querySelector('#stride-value'))
	sizeValue = /** @type {HTMLElement} */ (document.querySelector('#size-value'))
	jitterValue = /** @type {HTMLElement} */ (document.querySelector('#jitter-value'))
	slicePositionValue = /** @type {HTMLElement} */ (document.querySelector('#slice-position-value'))
	sliceThicknessValue = /** @type {HTMLElement} */ (document.querySelector('#slice-thickness-value'))

	pointCountEl = /** @type {HTMLElement} */ (document.querySelector('#point-count'))
	volumeDimsEl = /** @type {HTMLElement} */ (document.querySelector('#volume-dims'))
	dataRangeEl = /** @type {HTMLElement} */ (document.querySelector('#data-range'))

	// Wire up event listeners
	thresholdSlider.addEventListener('input', e => {
		const target = /** @type {HTMLInputElement} */ (e.target)
		thresholdValue.textContent = target.value
		if (volume) updatePointCloud(+target.value, +strideSlider.value, +sizeSlider.value, +jitterSlider.value)
	})

	strideSlider.addEventListener('input', e => {
		const target = /** @type {HTMLInputElement} */ (e.target)
		strideValue.textContent = target.value
		if (volume) updatePointCloud(+thresholdSlider.value, +target.value, +sizeSlider.value, +jitterSlider.value)
	})

	sizeSlider.addEventListener('input', e => {
		const target = /** @type {HTMLInputElement} */ (e.target)
		sizeValue.textContent = target.value
		if (volume) updatePointCloud(+thresholdSlider.value, +strideSlider.value, +target.value, +jitterSlider.value)
	})

	jitterSlider.addEventListener('input', e => {
		const target = /** @type {HTMLInputElement} */ (e.target)
		jitterValue.textContent = target.value
		if (volume) updatePointCloud(+thresholdSlider.value, +strideSlider.value, +sizeSlider.value, +target.value)
	})

	slicePositionSlider.addEventListener('input', e => {
		const target = /** @type {HTMLInputElement} */ (e.target)
		slicePositionValue.textContent = target.value
		updateSlice(+target.value, +sliceThicknessSlider.value)
	})

	sliceThicknessSlider.addEventListener('input', e => {
		const target = /** @type {HTMLInputElement} */ (e.target)
		sliceThicknessValue.textContent = target.value
		updateSlice(+slicePositionSlider.value, +target.value)
	})
}

// Load the structural brain volume
async function loadBrain() {
	console.log('Loading brain volume...')
	volume = await NIfTILoader.load(structuralNiiUrl)
	stats = volume.getStats()

	console.log('Volume loaded:', {
		dimensions: [volume.header.nx, volume.header.ny, volume.header.nz],
		voxelSize: [volume.header.pixdim[1], volume.header.pixdim[2], volume.header.pixdim[3]],
		dataRange: stats,
		description: volume.header.descrip,
	})

	// Update info panel
	volumeDimsEl.textContent = `${volume.header.nx} × ${volume.header.ny} × ${volume.header.nz}`
	if (stats) {
		dataRangeEl.textContent = `${stats.min.toFixed(1)} – ${stats.max.toFixed(1)}`
	}

	// Set initial threshold to 20% of max
	const initialThreshold = (stats ? stats.max : 1) * 0.2
	thresholdSlider.max = String(stats ? stats.max : 1000)
	thresholdSlider.value = String(initialThreshold)
	thresholdValue.textContent = initialThreshold.toFixed(1)

	// Initialize jitter UI defaults
	jitterSlider.value = '0.15'
	jitterValue.textContent = '0.15'

	// Initial render with default parameters
	updatePointCloud(initialThreshold, 2, 0.5, 0.15)
}

/**
 * @param {number} threshold
 * @param {number} stride
 * @param {number} pointSize
 * @param {number} jitter
 */
function updatePointCloud(threshold, stride, pointSize, jitter) {
	if (!volume) return
	console.log(
		`Sampling points: threshold=${threshold.toFixed(1)}, stride=${stride}, size=${pointSize}, jitter=${jitter}`,
	)

	const {positions, intensities, count} = volume.samplePoints(threshold, stride, jitter)
	console.log(`Generated ${count} points`)

	// Update point count in UI
	pointCountEl.textContent = count.toLocaleString()

	// Map intensities to colors (grayscale to color gradient)
	const colors = new Float32Array(count * 3)
	const minIntensity = stats ? stats.min : 0
	const maxIntensity = stats ? stats.max : 1

	for (let i = 0; i < count; i++) {
		const normalized = (intensities[i] - minIntensity) / (maxIntensity - minIntensity)

		// Color gradient: blue -> cyan -> yellow -> red
		if (normalized < 0.33) {
			const t = normalized / 0.33
			colors[i * 3 + 0] = 0.0 // R
			colors[i * 3 + 1] = t // G
			colors[i * 3 + 2] = 1.0 // B
		} else if (normalized < 0.66) {
			const t = (normalized - 0.33) / 0.33
			colors[i * 3 + 0] = t // R
			colors[i * 3 + 1] = 1.0 // G
			colors[i * 3 + 2] = 1.0 - t // B
		} else {
			const t = (normalized - 0.66) / 0.34
			colors[i * 3 + 0] = 1.0 // R
			colors[i * 3 + 1] = 1.0 - t // G
			colors[i * 3 + 2] = 0.0 // B
		}
	}

	// Update Three.js geometry
	const geometry = new THREE.BufferGeometry()
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
	geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

	// Calculate bounding box for slice positioning
	geometry.computeBoundingBox()
	if (geometry.boundingBox) {
		boundingBox = {
			min: {x: geometry.boundingBox.min.x, y: geometry.boundingBox.min.y, z: geometry.boundingBox.min.z},
			max: {x: geometry.boundingBox.max.x, y: geometry.boundingBox.max.y, z: geometry.boundingBox.max.z},
		}
	}

	// Update the lume-points element's underlying Three.js object
	pointsElement.three.geometry.dispose()
	pointsElement.three.geometry = geometry

	// // Create or update Points material
	// // CONTINUE when not using this material (using the material via behaviors
	// // instead) the points are a solid color.
	// const material = new THREE.PointsMaterial({
	// 	size: pointSize,
	// 	vertexColors: true,
	// 	sizeAttenuation: true,
	// 	transparent: true,
	// 	opacity: 0.8,
	// 	blending: THREE.AdditiveBlending,
	// })
	// const mat = pointsElement.three.material
	// if (Array.isArray(mat)) mat.forEach(m => m.dispose())
	// else mat.dispose()
	// pointsElement.three.material = material

	scene.needsUpdate()

	// Update slice with current slider values
	updateSlice(+slicePositionSlider.value, +sliceThicknessSlider.value)
}

/**
 * Update the clip planes to create a slice view
 * @param {number} position - Slice position as percentage (0-100)
 * @param {number} thickness - Slice thickness as percentage (0-100)
 */
function updateSlice(position, thickness) {
	// Get the width of the point cloud on the X axis
	const width = boundingBox.max.x - boundingBox.min.x
	if (width === 0) return

	// Convert thickness percentage to actual distance
	const thicknessDistance = (thickness / 100) * width

	// Calculate the maximum movement range based on thickness
	// If thickness is 100%, no movement (slice shows everything)
	// If thickness is 0%, can move the full width
	const maxMovement = width - thicknessDistance

	// Convert position percentage to actual position within allowed range
	const normalizedPosition = position / 100 // 0 to 1
	const centerX = boundingBox.min.x + normalizedPosition * maxMovement + thicknessDistance / 2

	// Position the two clip planes to create the slice
	// Clip plane 1: faces left (-X direction), positioned at the left edge of slice
	clipPlane1.position.x = centerX - thicknessDistance / 2
	// CONTINUE orientation of clip planes, and actual clipping not happening yet

	// Clip plane 2: faces right (+X direction), positioned at the right edge of slice
	clipPlane2.position.x = centerX + thicknessDistance / 2

	scene.needsUpdate()
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		initUI()
		loadBrain().catch(console.error)
	})
} else {
	initUI()
	loadBrain().catch(console.error)
}

// Expose controls globally for testing
window.updateBrain = updatePointCloud
window.brainVolume = () => volume
window.brainStats = () => stats
