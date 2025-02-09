// This file generates an importmap script dynamically using JavaScript. This is
// a convenient way to generate it based on dynamic features such as variables.
{
	// Tip: easily generate a CDN importmap using https://generator.jspm.io.
	document.write(html`
		<script type="importmap">
			{
				"imports": {
			                 ${'' /* lume dependencies */}
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
					"solid-js/web": "https://cdn.jsdelivr.net/npm/solid-js@1.9.3/web/dist/dev.js",

			                 ${'' /* live-code dependencies (codemirror mainly) */}
					"@lume/live-code": "https://cdn.jsdelivr.net/npm/@lume/live-code@0.6.6/dist/index.js",
					"@babel/runtime/helpers/extends": "https://cdn.jsdelivr.net/npm/@babel/runtime@7.25.6/helpers/esm/extends.js",
					"@codemirror/autocomplete": "https://cdn.jsdelivr.net/npm/@codemirror/autocomplete@6.18.0/dist/index.js",
					"@codemirror/commands": "https://cdn.jsdelivr.net/npm/@codemirror/commands@6.6.1/dist/index.js",
					"@codemirror/lang-css": "https://cdn.jsdelivr.net/npm/@codemirror/lang-css@6.3.0/dist/index.js",
					"@codemirror/lang-html": "https://cdn.jsdelivr.net/npm/@codemirror/lang-html@6.4.9/dist/index.js",
					"@codemirror/lang-javascript": "https://cdn.jsdelivr.net/npm/@codemirror/lang-javascript@6.2.2/dist/index.js",
					"@codemirror/language": "https://cdn.jsdelivr.net/npm/@codemirror/language@6.10.2/dist/index.js",
					"@codemirror/lint": "https://cdn.jsdelivr.net/npm/@codemirror/lint@6.8.1/dist/index.js",
					"@codemirror/search": "https://cdn.jsdelivr.net/npm/@codemirror/search@6.5.6/dist/index.js",
					"@codemirror/state": "https://cdn.jsdelivr.net/npm/@codemirror/state@6.4.1/dist/index.js",
					"@codemirror/view": "https://cdn.jsdelivr.net/npm/@codemirror/view@6.33.0/dist/index.js",
					"@lezer/common": "https://cdn.jsdelivr.net/npm/@lezer/common@1.2.1/dist/index.js",
					"@lezer/css": "https://cdn.jsdelivr.net/npm/@lezer/css@1.1.9/dist/index.js",
					"@lezer/highlight": "https://cdn.jsdelivr.net/npm/@lezer/highlight@1.2.1/dist/index.js",
					"@lezer/html": "https://cdn.jsdelivr.net/npm/@lezer/html@1.3.10/dist/index.js",
					"@lezer/javascript": "https://cdn.jsdelivr.net/npm/@lezer/javascript@1.4.17/dist/index.js",
					"@lezer/lr": "https://cdn.jsdelivr.net/npm/@lezer/lr@1.4.2/dist/index.js",
					"@uiw/codemirror-theme-noctis-lilac": "https://cdn.jsdelivr.net/npm/@uiw/codemirror-theme-noctis-lilac@4.23.2/esm/index.js",
					"@uiw/codemirror-themes": "https://cdn.jsdelivr.net/npm/@uiw/codemirror-themes@4.23.2/esm/index.js",
					"code-mirror-el": "https://cdn.jsdelivr.net/npm/code-mirror-el@0.1.5/dist/index.js",
					"codemirror": "https://cdn.jsdelivr.net/npm/codemirror@6.0.1/dist/index.js",
					"crelt": "https://cdn.jsdelivr.net/npm/crelt@1.0.6/index.js",
					"lodash-es/": "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/",
					"style-mod": "https://cdn.jsdelivr.net/npm/style-mod@4.1.2/src/style-mod.js",
					"thememirror/": "https://cdn.jsdelivr.net/npm/thememirror@2.0.1/",
					"w3c-keyname": "https://cdn.jsdelivr.net/npm/w3c-keyname@2.2.8/index.js"
				}
			}
		</script>
	`)
}
