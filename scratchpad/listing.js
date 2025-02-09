{
	document.write(/*html*/ `
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./listing.css" />
    `)

	window.addEventListener('DOMContentLoaded', () => {
		const listing = Array.from(document.documentElement.querySelectorAll('a'))

		for (const link of listing) {
			let href = link.getAttribute('href') ?? ''
			if (href.endsWith('/index.html')) href = href.slice(0, -10) // Remove /index.html
			link.textContent = href
		}
	})
}
