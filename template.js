// This file writes the default HTML template for all pages.
// Include it with `<script src="template.js"></script>` and then any HTML
// content after it will be wrapped by the template automatically (a neat but
// not-well-known built-in feature of browsers).
//
// In the following example, the <meta> tag will automatically be placed into
// the `<head>`, and the `<h1>` tag will automatically be placed into the
// `<body>`:
//
// ```html
// <script src="template.js"></script>
// <meta name="description" content="My cool page">
// <h1>Welcome to my page</h1>
// ```

// Identity template tag for HTML formatting in IDEs (f.e. Prettier).
const html = (strings, ...values) => String.raw(strings, ...values)

{
	const inIframe = window.parent !== window

	const script = document.currentScript
	const title = script.getAttribute('title') ?? ''
	const base = script.getAttribute('base') ?? (inIframe ? window.parent.location.href : '')

	if (base) document.write(`<base href="${base}" />`)

	const dir = new URL(script.src).href.split('/').slice(0, -1).join('/')
	const template = script.getAttribute('template') || dir + '/template.html'
	const importmap = script.getAttribute('importmap') || dir + '/importmap.js'

	// Fetch our shared top-level HTML template synchronously. If we don't do it
	// synchronously, we won't be able to take advantage of the next
	// document.write trick, which has to run during parsing.
	const r = new XMLHttpRequest()
	r.open('GET', template, /*not asynchronous!*/ false)
	r.send()

	let templateHtml = r.responseText

	if (importmap) templateHtml = templateHtml.replace('src="./importmap.js"', `src="${importmap}"`)

	// This script executes during parsing, and this line writes the HTML
	// template synchronously, creating the <head> and <body> elements. When the
	// parser continues parsing after this code runs, any further content it
	// encounters while parsing will then be placed into the created <body>.
	// This is a nifty trick for sharing a top-level re-usable HTML template!
	document.write(templateHtml)

	// Each example specifies the title for its tab by putting a title="foo"
	// attribute on the tag that is executing this code.
	document.title = 'Joe Pea' + (title ? ` - ${title}` : '')

	// If we're in an iframe, hijack links so they nav the parent window. TODO
	// do this only when the parent window is ours (don't try to mess with other
	// sites embedding us).
	if (inIframe) {
		window.addEventListener('DOMContentLoaded', () => {
			const links = Array.from(document.querySelectorAll('a'))

			for (const link of links) {
				link.addEventListener('click', event => {
					event.preventDefault()
					window.parent.location = link.href
				})
			}
		})
	}
}
