import * as pako from 'pako'

/**
 * Minimal NIfTI-1 loader for browser.
 * Fetches .nii.gz, decompresses, parses header and voxel data.
 * Reference: https://nifti.nimh.nih.gov/nifti-1/documentation/nifti1fields
 */
export class NIfTILoader {
	/**
	 * Load a NIfTI-1 file from URL.
	 * @param {string} url - Path to .nii or .nii.gz file
	 * @returns {Promise<NIfTIVolume>}
	 */
	/**
	 * @param {string} url
	 */
	static async load(url) {
		const response = await fetch(url)
		if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`)

		let arrayBuffer = await response.arrayBuffer()

		// If gzipped, decompress with pako
		if (url.endsWith('.gz')) {
			const compressed = new Uint8Array(arrayBuffer)
			const decompressed = pako.inflate(compressed)
			arrayBuffer = decompressed.buffer
		}

		return new NIfTIVolume(arrayBuffer)
	}
}

export class NIfTIVolume {
	/**
	 * @param {ArrayBuffer} arrayBuffer
	 */
	constructor(arrayBuffer) {
		this.buffer = arrayBuffer
		this.header = this.parseHeader(arrayBuffer)
		this.data = this.parseData(arrayBuffer)
	}

	/**
	 * @param {ArrayBuffer} buffer
	 */
	parseHeader(buffer) {
		const view = new DataView(buffer)
		const littleEndian = this.isLittleEndian(view)

		/** @type {any} */
		const header = {}
		header.sizeof_hdr = view.getInt32(0, littleEndian)
		if (header.sizeof_hdr !== 348) {
			throw new Error(`Invalid NIfTI-1 header size: ${header.sizeof_hdr} (expected 348)`)
		}

		// Dimensions: dim[0] = number of dimensions, dim[1..7] = size of each dimension
		header.dim = []
		for (let i = 0; i < 8; i++) {
			header.dim[i] = view.getInt16(40 + i * 2, littleEndian)
		}

		header.ndim = header.dim[0]
		header.nx = header.dim[1]
		header.ny = header.dim[2]
		header.nz = header.dim[3]
		header.nt = header.dim[4] || 1 // time dimension

		// Voxel dimensions (mm)
		header.pixdim = []
		for (let i = 0; i < 8; i++) {
			header.pixdim[i] = view.getFloat32(76 + i * 4, littleEndian)
		}

		header.voxel_offset = view.getFloat32(108, littleEndian)
		header.scl_slope = view.getFloat32(112, littleEndian)
		header.scl_inter = view.getFloat32(116, littleEndian)

		// If slope is 0, default to 1
		if (header.scl_slope === 0) header.scl_slope = 1

		// Data type
		header.datatype = view.getInt16(70, littleEndian)
		header.bitpix = view.getInt16(72, littleEndian)

		// Description
		const descBytes = new Uint8Array(buffer, 148, 80)
		header.descrip = String.fromCharCode(...Array.from(descBytes)).replace(/\0.*$/, '')

		// Quaternion and affine transform parameters (for orientation)
		header.qform_code = view.getInt16(252, littleEndian)
		header.sform_code = view.getInt16(254, littleEndian)
		header.quatern_b = view.getFloat32(256, littleEndian)
		header.quatern_c = view.getFloat32(260, littleEndian)
		header.quatern_d = view.getFloat32(264, littleEndian)
		header.qoffset_x = view.getFloat32(268, littleEndian)
		header.qoffset_y = view.getFloat32(272, littleEndian)
		header.qoffset_z = view.getFloat32(276, littleEndian)

		// Affine transform matrix (sform)
		header.srow_x = [
			view.getFloat32(280, littleEndian),
			view.getFloat32(284, littleEndian),
			view.getFloat32(288, littleEndian),
			view.getFloat32(292, littleEndian),
		]
		header.srow_y = [
			view.getFloat32(296, littleEndian),
			view.getFloat32(300, littleEndian),
			view.getFloat32(304, littleEndian),
			view.getFloat32(308, littleEndian),
		]
		header.srow_z = [
			view.getFloat32(312, littleEndian),
			view.getFloat32(316, littleEndian),
			view.getFloat32(320, littleEndian),
			view.getFloat32(324, littleEndian),
		]

		return header
	}

	/**
	 * @param {DataView} view
	 */
	isLittleEndian(view) {
		// Check dim[0] to determine endianness
		const dim0_little = view.getInt16(40, true)
		const dim0_big = view.getInt16(40, false)

		// dim[0] should be between 1 and 7
		if (dim0_little >= 1 && dim0_little <= 7) return true
		if (dim0_big >= 1 && dim0_big <= 7) return false

		// Fallback: check sizeof_hdr
		const hdr_little = view.getInt32(0, true)
		return hdr_little === 348
	}

	/**
	 * @param {ArrayBuffer} buffer
	 */
	parseData(buffer) {
		const header = this.header
		const voxelOffset = header.voxel_offset || 352 // Default offset after header
		const numVoxels = header.nx * header.ny * header.nz * header.nt

		let rawData
		const littleEndian = this.isLittleEndian(new DataView(buffer))

		// Parse based on datatype
		switch (header.datatype) {
			case 2: // unsigned char
				rawData = new Uint8Array(buffer, voxelOffset, numVoxels)
				break
			case 4: // signed short
				rawData = new Int16Array(buffer, voxelOffset, numVoxels)
				break
			case 8: // signed int
				rawData = new Int32Array(buffer, voxelOffset, numVoxels)
				break
			case 16: // float
				rawData = new Float32Array(buffer, voxelOffset, numVoxels)
				break
			case 64: // double
				rawData = new Float64Array(buffer, voxelOffset, numVoxels)
				break
			case 512: // unsigned short
				rawData = new Uint16Array(buffer, voxelOffset, numVoxels)
				break
			case 768: // unsigned int
				rawData = new Uint32Array(buffer, voxelOffset, numVoxels)
				break
			default:
				throw new Error(`Unsupported NIfTI datatype: ${header.datatype}`)
		}

		// Apply scaling if needed
		const data = new Float32Array(numVoxels)
		for (let i = 0; i < numVoxels; i++) {
			data[i] = rawData[i] * header.scl_slope + header.scl_inter
		}

		return data
	}

	/**
	 * Get voxel value at (i, j, k) indices.
	 * @param {number} i - X index
	 * @param {number} j - Y index
	 * @param {number} k - Z index
	 * @param {number} t - Time index (default 0)
	 * @returns {number}
	 */
	getVoxel(i, j, k, t = 0) {
		const {nx, ny, nz} = this.header
		if (i < 0 || i >= nx || j < 0 || j >= ny || k < 0 || k >= nz) return 0

		const index = i + j * nx + k * nx * ny + t * nx * ny * nz
		return this.data[index]
	}

	/**
	 * Get statistics about the volume data.
	 * @returns {{min: number, max: number, mean: number}}
	 */
	getStats() {
		let min = Infinity
		let max = -Infinity
		let sum = 0

		for (let i = 0; i < this.data.length; i++) {
			const val = this.data[i]
			if (val < min) min = val
			if (val > max) max = val
			sum += val
		}

		return {min, max, mean: sum / this.data.length}
	}

	/**
	 * Sample voxels above a threshold to generate point cloud data.
	 * @param {number} threshold - Minimum intensity value
	 * @param {number} stride - Sample every Nth voxel (1 = all, 2 = every other, etc.)
	 * @param {number} jitter - Random offset amount in voxel units (0..0.5 typical). 0 = none.
	 * @returns {{positions: Float32Array, intensities: Float32Array, count: number}}
	 */
	samplePoints(threshold = 0, stride = 1, jitter = 0) {
		const {nx, ny, nz, pixdim} = this.header
		const dx = pixdim[1] || 1
		const dy = pixdim[2] || 1
		const dz = pixdim[3] || 1

		// First pass: count valid points
		let count = 0
		for (let k = 0; k < nz; k += stride) {
			for (let j = 0; j < ny; j += stride) {
				for (let i = 0; i < nx; i += stride) {
					const val = this.getVoxel(i, j, k)
					if (val >= threshold) count++
				}
			}
		}

		// Second pass: collect positions and intensities
		const positions = new Float32Array(count * 3)
		const intensities = new Float32Array(count)
		let idx = 0

		// Center the volume around origin
		const cx = (nx * dx) / 2
		const cy = (ny * dy) / 2
		const cz = (nz * dz) / 2

		// Hash-based deterministic jitter per voxel index to avoid shimmering
		/** @param {number} a @param {number} b @param {number} c @returns {number} */
		const rand = (a, b, c) => {
			const s = Math.sin(a * 12.9898 + b * 78.233 + c * 37.719) * 43758.5453
			return s - Math.floor(s) // 0..1
		}

		for (let k = 0; k < nz; k += stride) {
			for (let j = 0; j < ny; j += stride) {
				for (let i = 0; i < nx; i += stride) {
					const val = this.getVoxel(i, j, k)
					if (val >= threshold) {
						let ox = 0,
							oy = 0,
							oz = 0
						if (jitter > 0) {
							// jitter measured in voxels, scale by voxel size for world units
							ox = (rand(i, j, k) - 0.5) * jitter * dx
							oy = (rand(i + 17, j + 31, k + 47) - 0.5) * jitter * dy
							oz = (rand(i + 73, j + 11, k + 59) - 0.5) * jitter * dz
						}
						positions[idx * 3 + 0] = i * dx - cx + ox
						positions[idx * 3 + 1] = j * dy - cy + oy
						positions[idx * 3 + 2] = k * dz - cz + oz
						intensities[idx] = val
						idx++
					}
				}
			}
		}

		return {positions, intensities, count}
	}
}
