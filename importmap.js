// This file generates an importmap script dynamically using JavaScript. This is
// a convenient way to generate it based on dynamic features such as variables.
{
	// Tip: easily generate a CDN importmap using https://generator.jspm.io.
	document.write(html`
		<script type="importmap">
			{
				"imports": {
					"lume": "https://cdn.jsdelivr.net/npm/lume@0.3.0-alpha.44/dist/index.js",
					"three": "https://cdn.jsdelivr.net/npm/three@0.170.0/src/Three.js",
					"three/webgpu": "https://cdn.jsdelivr.net/npm/three@0.170.0/src/Three.WebGPU.js",
					"three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/",
					"three/": "https://cdn.jsdelivr.net/npm/three@0.170.0/",
					"@lume/autolayout": "https://cdn.jsdelivr.net/npm/@lume/autolayout@0.10.2/dist/AutoLayout.js",
					"@lume/custom-attributes": "https://cdn.jsdelivr.net/npm/@lume/custom-attributes@0.2.4/dist/index.js",
					"@lume/custom-attributes/": "https://cdn.jsdelivr.net/npm/@lume/custom-attributes@0.2.4/",
					"@lume/element": "https://cdn.jsdelivr.net/npm/@lume/element@0.13.1/dist/index.js",
					"@lume/eventful": "https://cdn.jsdelivr.net/npm/@lume/eventful@0.3.3/dist/index.js",
					"@lume/kiwi": "https://cdn.jsdelivr.net/npm/@lume/kiwi@0.4.4/dist/kiwi.js",
					"@lume/three-projected-material": "https://cdn.jsdelivr.net/npm/@lume/three-projected-material@0.3.1/dist/ProjectedMaterial.js",
					"@lume/three-projected-material/": "https://cdn.jsdelivr.net/npm/@lume/three-projected-material@0.3.1/",
					"classy-solid": "https://cdn.jsdelivr.net/npm/classy-solid@0.4.3/dist/index.js",
					"element-behaviors": "https://cdn.jsdelivr.net/npm/element-behaviors@5.0.5/dist/index.js",
					"james-bond": "https://cdn.jsdelivr.net/npm/james-bond@0.7.4/dist/index.js",
					"lowclass/": "https://cdn.jsdelivr.net/npm/lowclass@8.0.2/",
					"regexr": "https://cdn.jsdelivr.net/npm/regexr@2.0.4/dist/index.js",
					"solid-js": "https://cdn.jsdelivr.net/npm/solid-js@1.9.3/dist/dev.js",
					"solid-js/html": "https://cdn.jsdelivr.net/npm/solid-js@1.9.3/html/dist/html.js",
					"solid-js/store": "https://cdn.jsdelivr.net/npm/solid-js@1.9.3/store/dist/dev.js",
					"solid-js/web": "https://cdn.jsdelivr.net/npm/solid-js@1.9.3/web/dist/dev.js"
				}
			}
		</script>
	`)
}
