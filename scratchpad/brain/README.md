# 🧠 Brain Volume Point Cloud Renderer

A performant particle-based brain visualization using NIfTI volumetric data rendered with Lume 3D and Three.js Points.

## Features

- **NIfTI-1 Support**: Loads gzipped `.nii.gz` brain volumes with automatic decompression (pako)
- **Point Cloud Rendering**: Uses Three.js `BufferGeometry` + `Points` for efficient GPU rendering
- **Real-time Controls**:
  - **Threshold**: Filter voxels by intensity to adjust brain visibility
  - **Sample Stride**: Control point density (1=all voxels, 2=every other, etc.)
  - **Point Size**: Adjust particle size for visual clarity
- **Color Mapping**: Intensity values mapped to gradient (blue → cyan → yellow → red)
- **Additive Blending**: Semi-transparent particles with glow effect

## Files

- **index.html** – Lume scene with `<lume-points>` element and UI controls
- **index.js** – Main logic: loads volume, samples points, updates geometry
- **NIfTILoader.js** – Minimal NIfTI-1 parser with pako decompression
- **importmap.js** – CDN imports for Lume, Three.js, and pako
- **data/** – Brain volumes:
  - `structural.nii.gz` (11 MB) – T1-weighted structural MRI
  - `functional.nii.gz` (19 MB) – Functional MRI with time dimension

## Usage

1. **Open** `scratchpad/brain/index.html` in a browser (or serve via local server)
2. **Adjust** threshold slider to reveal/hide brain structures based on intensity
3. **Modify** stride to trade off point density vs. performance
4. **Tweak** point size for visual preference

### Console API

```javascript
// Access loaded volume
window.brainVolume()

// Get data statistics
window.brainStats() // {min, max, mean}

// Manually update rendering
window.updateBrain(threshold, stride, pointSize)
```

## Performance

- **Stride = 1** (~300k–500k points): High detail, may lag on older GPUs
- **Stride = 2** (~100k–150k points): **Recommended** – smooth, detailed
- **Stride = 3+** (<50k points): Very fast, lower detail

## Data Source

Sample brain volumes from [BrainBrowser](https://github.com/aces/brainbrowser) examples:

- Structural: anonymized T1 MRI scan
- Functional: 4D fMRI with temporal dimension (for future animation)

## Technical Notes

- **NIfTI-1 Format**: Standard neuroimaging format; header + voxel data
- **Coordinate System**: Volumes are centered at origin; voxel spacing from header metadata
- **Color Mapping**: Linear interpolation through RGB gradient based on normalized intensity
- **Geometry Updates**: Uses `BufferAttribute` for positions/colors; disposed and recreated on parameter change (could optimize with `needsUpdate` flags for streaming updates)

## Future Enhancements

- [ ] GPU-accelerated thresholding via compute shader
- [ ] Time-series animation for 4D functional data
- [ ] Custom shader for size/opacity attenuation by intensity
- [ ] LOD (level of detail) based on camera distance
- [ ] Slice plane overlay for anatomical reference
- [ ] Multiple volume blending
