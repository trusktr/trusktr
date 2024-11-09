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
	console.log('hello world')

	document.write(html`
		<html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<style>
					html,
					body {
						margin: 0;
						height: 100%;
						background: radial-gradient(circle, rgb(90, 97, 128) 0%, rgb(36, 32, 36) 100%);
						color: #ffb6b6;
						font-family: sans-serif;
					}
				</style>

				<script src="./importmap.js"></script>
			</head>

			<body></body>
		</html>
	`)
}
