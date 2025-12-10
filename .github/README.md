# Hi there 👋 <!-- omit in toc -->

I'm Joe Pea (a.k.a. trusktr 🛹) — a builder and maintainer focused on expanding what HTML can do for interactive, graphic-rich web experiences.

I work on open web tooling, new HTML elements, and standards-aligned libraries that make it easier to create 2D and 3D experiences directly in the browser. I enjoy bringing together WebGL, WebAssembly, custom elements, and small, composable APIs that let people ship expressive, hardware-accelerated UIs without huge toolchains.

I help teams ship HTML-first accelerated interfaces without heavy toolchains.

This repo is my personal README/profile, showcasing my work, projects, and writing, and will evolve over time.

![PLACEHOLDER hero demo](https://placehold.co/1200x380/111827/E5E7EB.svg?font=poppins&text=PLACEHOLDER%20hero%20GIF%20or%20screenshot)

## At a glance <!-- omit in toc -->

- [Lume](https://github.com/lume/lume) (~1.5k ★) · [GLAS](https://github.com/lume/glas) (~920 ★) · [@lume/element](https://github.com/lume/element) (~170 ★) · [classy-solid](https://github.com/lume/classy-solid) (~60 ★)
- Contributor: [Docsify](https://github.com/docsifyjs/docsify) (30k+ ★), [SolidJS](https://github.com/solidjs/solid) (34k+ ★)

## Table of contents <!-- omit in toc -->

- [Resume](#resume)
- [Web origins](#web-origins)
- [Career highlights](#career-highlights)
- [Featured projects](#featured-projects)
- [Writing](#writing)
- [Where to find me](#where-to-find-me)

Along the way, I've contributed to widely used open-source projects and shipped production systems with teams at companies like **SpaceX**, **NASA**, **Velodyne Lidar**, and **IMVU** — building interfaces that connect humans to complex systems in real time.

## Resume

[View or download my resume (PDF)](https://github.com/trusktr/assets/blob/main/Joe%20Pea%20Resume.pdf)

## Web origins

[Read the story of my journey into web development.](web-origins.md)

## Career highlights

<details>
	<summary><strong>Career highlights (selected)</strong></summary>

- **Lume Creative Technologies — Founder (Jul 2022–Present)**
  - Advisory/lead engineering for 3D web apps. Recent engagements include:
    - **Drippy (2025–):** Technical advisor guiding a junior team to ship a 3D-enabled Meteor.js app with Lume.
    - **Meta (2024–2025):** Implemented a web-based 3D mesh editor with robust undo/redo for Reality Labs ML workflows; contributed fixes across their codebase.
    - **Luda Projects (2022–2023):** Built a 3D NFT character creator (Neo Fairies) and added features to Mels (ML-driven characters) with Babylon.js, Three.js, and Lume.
    - **Autonomys (2023):** Prototyped a 3D AI character starter integrating speech-to-text, LLMs, and text-to-speech with facial animation; revived AWS Sumerian Hosts; rendered with WebGL/Three/Lume.

- **Uthana — Software Engineer, 3D experience (Feb–Aug 2024)**
  - Designed and shipped an AI → 3D animation pipeline UI: upload a 3D model, describe motion, preview, tweak, and export; 2D UI overlaid on a 3D scene (WebGL/Three/Lume), with Python backend adjustments.

- **SpaceX — Senior Software Engineer, Starship Displays (Sep 2022–Jun 2023)**
  - Built a custom plotting system capable of rendering ~1.2 million points/vertices from real-time Starship data at 10 Hz using Three.js/WebGL.
  - Increased throughput of an existing plotting pipeline by ~1600% on target hardware; improved UI performance (e.g., grid → flexbox), introduced reactive patterns (signals/effects), migrated apps to TypeScript, and contributed to a custom-elements design system.

- **NASA — Software Engineer, web 3D (Apr 2021–Aug 2022)**
  - ISAAC Astrobee robot visualizer (WebGL/Three), APRES timeline for planning/validation, and DSA satellite constellation viewer/command sequencer (HTML/CSS/JS, Solid.js, CodeMirror).

- **Velodyne Lidar — Senior Software Engineer, web (Jul 2019–Apr 2021)**
  - Real-time perception visualizer for automotive AI, ingesting embedded telemetry (ROS/ZeroMQ) and rendering with WebGL; authored a reusable Custom Elements component system.

- **Mapper.ai — Senior Software Engineer, web (Apr 2018–Jul 2019)**
  - 3D map “Annotator” tool (Three.js), company website rebuild (React/TypeScript), and mobile graphics perf improvements.

- **Earlier highlights (2012–2018)**
  - **AKQA for IBM Watson:** interactive WebGL/GLSL effects, pagination state machine, inertial scrolling, particle systems.
  - **IMVU:** TypeScript+React foundations, 3D scene editing UI with undo/redo and keyframe timeline.
  - **Freelance + product gigs:** Meteor/React/Famous/Lume apps, module tooling, 3D UIs.
  - **Globant (The Climate Corporation):** modular Backbone/Marionette frontends and map tiling upgrades.
  - **Federal Reserve Bank:** InfoSec intern (firmware PoCs and mitigations).
  - **Hewlett Packard:** frontend lead (Angular, Bootstrap) for storage analytics.
  - **Sacramento City College (Express newspaper), Clownfish Media:** shipped production sites and interactive media tooling.
  </details>

## Featured projects

![Lume hero](https://placehold.co/960x280/0E7490/EFF6FF.svg?font=poppins&text=Lume%20%E2%80%94%203D%20HTML%20Elements)

- **`lume`** — GPU-powered 3D HTML. New HTML elements for rich 2D/3D experiences with lights, shadows, models, and physics-like behaviors — all from markup. Under the hood, Lume composes WebGL and CSS3D while staying _HTML-first_ and framework-agnostic.
  - Why use it:
    - Write 3D like you write HTML — declarative, readable, and portable across React, Vue, Svelte, Solid, Angular, and vanilla.
    - Hardware-accelerated visuals with a tiny mental model and live, forkable [examples](https://docs.lume.io/examples/hello-world/).
    - Designed for product teams: composable primitives, strong typing, and a steady release cadence.
  - Explore: [site](https://lume.io) · [docs/examples](https://docs.lume.io) · [repo](https://github.com/lume/lume)

![@lume/element](https://placehold.co/960x220/111827/FDE68A.svg?font=poppins&text=%40lume%2Felement%20%E2%80%94%20Custom%20Elements%20made%20easy)

- **`@lume/element`** — A fast, minimal system for writing Custom Elements with **reactive props**, **declarative templates** (JSX or `html` tag), and **scoped CSS**. Integrates cleanly with Solid.js’ fine-grained reactivity for predictable updates without a VDOM.
  - Why use it:
    - Create interoperable web components that work in any app or framework.
    - First-class TypeScript DX: autocompletion and strong types across JSX ecosystems.
    - Batteries included: decorators, attribute-to-prop mapping, and framework type helpers.
  - Explore: [repo/docs/examples](https://github.com/lume/element)

![nimble-html](https://placehold.co/960x220/065F46/ECFEFF.svg?font=poppins&text=nimble-html%20%E2%80%94%20Buildless%20reactive%20templates)

<!-- ![nimble-html](https://repository-images.githubusercontent.com/1064917262/5c2a50a7-e8ab-453c-911f-ea07d809d316) -->

- **`nimble-html`** — A single-file, zero-dependency `html`/`svg`/`mathml` template tag for declarative-reactive UIs. Render once, then update in place by calling the same template — no framework required.
  - Why use it:
    - Ultra-light: drop one file into any codebase; works with import maps/CDNs.
    - Real DOM, no VDOM; event/prop/boolean bindings and SVG/MathML namespaces built-in.
    - Power features when you need them (`force()` updates, lightsaber `!` syntax, key-based instance identity).
  - Explore: [repo/examples](https://github.com/lume/nimble-html)

![GLAS](https://placehold.co/960x220/0B132B/E2E8F0.svg?font=poppins&text=GLAS%20%E2%80%94%20WebGL%20in%20WebAssembly)

- **GLAS** — WebGL in WebAssembly via AssemblyScript. A long-term effort to port Three.js primitives and patterns to a Wasm core for predictable performance and tighter memory profiles.
  - Why use it (or follow it):
    - Push performance-sensitive graphics to Wasm while staying close to TypeScript ergonomics.
    - A stepping stone toward cross-runtime rendering with strong type guarantees.
  - Explore: [repo](https://github.com/lume/glas) · [contributing](https://github.com/lume/glas/blob/main/.github/CONTRIBUTING.md)

![asdom](https://placehold.co/960x220/7C3AED/F5F3FF.svg?font=poppins&text=asdom%20%E2%80%94%20DOM%20APIs%20from%20AssemblyScript)

- **`asdom`** — DOM bindings for AssemblyScript so WebAssembly code can manipulate the DOM directly (including Custom Elements). Useful when hot code paths need to hop across the Wasm boundary efficiently.
  - Why use it:
    - Call `document`, `window`, and Custom Elements APIs from AssemblyScript.
    - Bridges ergonomically with AssemblyScript projects and Wasm tooling.
  - Explore: [repo](https://github.com/lume/asdom) · [supported APIs](https://github.com/lume/asdom/blob/main/supported-APIs.md)

![classy-solid](https://private-user-images.githubusercontent.com/23491276/413578188-f091e629-7752-4a1a-808c-8672c1da072c.svg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjMyNzUzNjIsIm5iZiI6MTc2MzI3NTA2MiwicGF0aCI6Ii8yMzQ5MTI3Ni80MTM1NzgxODgtZjA5MWU2MjktNzc1Mi00YTFhLTgwOGMtODY3MmMxZGEwNzJjLnN2Zz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTExMTYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMTE2VDA2Mzc0MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTFlNmQ3NWMzNTY1YmUxZmQwNWUwNjBmODZkZjIyMTdkN2RlZDQ5YzE1N2NjNzkxYWQ4YjE4NTI4ZDczMWFiMGMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.mHGskX1w7kVh_x5LzVcvnVdMHnZSwyRJhL-HwDrumoE)

- **`classy-solid`** — Class-based reactivity and class components for Solid.js. Decorators like `@signal` and `@component` make class properties reactive and renderable.
  - Why use it:
    - Keep OO ergonomics while using Solid’s fine-grained reactivity.
    - Cleaner composition, better DX in codebases that prefer classes.
  - Explore: [repo](https://github.com/lume/classy-solid)

![Docsify & Solid contributions](https://placehold.co/960x200/E5E7EB/111827.svg?font=poppins&text=Open%20source%20contributions%3A%20Docsify%20%26%20Solid.js)

- **Docsify** (contributor) — Buildless documentation that “just works.” I’ve contributed improvements to developer experience and docs. Explore: [docsifyjs/docsify](https://github.com/docsifyjs/docsify)
- **Solid.js** (contributor) — Fine-grained reactivity that powers parts of Lume and `@lume/element`. See contributions in [solidjs/solid](https://github.com/solidjs/solid) (I’m listed among contributors).

- [Personal Scratchpad](https://github.com/trusktr) with demos, experiments, and small building blocks.

## Writing

- HTML’s Graphical 3D Future — https://dev.to/trusktr/htmls-graphical-3d-future-3gnd
- Docsify.js single-page apps are indexable on Google! — https://dev.to/trusktr/docsifyjs-single-page-apps-are-indexable-on-google-3loi
- Featured CodePen demo — PLACEHOLDER_LINK (replace with your favorite pen)

<!--

## Thoughts on engineering

- Prefer standards-aligned building blocks (Custom Elements / HTML-first) so projects stay interoperable across frameworks.
- Make small, composable APIs that scale (nimble-html is my latest example).
- Use WASM where it helps (AssemblyScript projects like `asdom` and `glas`), and keep the web platform as a first-class runtime.

## Now / Roadmap

- Lume: CSS styling/animations for 3D properties (planned) — https://github.com/lume/lume/issues/159
- Lume: More behaviors and examples (PLACEHOLDER specifics)
- @lume/element: Expanded TypeScript docs and patterns (PLACEHOLDER link)
- GLAS: Canvas hookup + first visual milestone (PLACEHOLDER tracking issue)

-->

## Where to find me

<picture> <source srcset="https://github.githubassets.com/favicons/favicon.svg" media="(prefers-color-scheme: light)" /> <source srcset="https://github.githubassets.com/favicons/favicon-dark.svg" media="(prefers-color-scheme: dark)" /> <img height="18" alt="GitHub icon"  /> </picture> **GitHub** — [@trusktr](https://github.com/trusktr) (experiments and code libraries)

<img height="18" alt="CodePen icon" srcset="../images/codepen.svg" /> **CodePen** — [trusktr](https://codepen.io/trusktr)

<img height="18" alt="X icon" src="https://abs.twimg.com/favicons/twitter.3.ico"> **X (formerly Twitter)** — [@trusktr](https://x.com/trusktr)

<img height="18" alt="Bluesky icon" src="https://web-cdn.bsky.app/static/favicon-32x32.png"> **Bluesky** — [@joe.trusktr.io](https://bsky.app/profile/joe.trusktr.io)

<img height="18" alt="Mastodon icon" src="https://mastodon.social/packs/assets/favicon-32x32-CiQz7Niw.png"> **Mastodon** — [@trusktr@indieweb.social](https://indieweb.social/@trusktr)

<img height="18" alt="LinkedIn icon" src="https://static.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico"> **LinkedIn** — [Joe Pea](https://linkedin.com/in/joepea)

If you'd like to collaborate on creative interactive experiences, web standards,
or custom element design, feel free to connect on any of the profiles above — I
enjoy sharing knowledge and working with teams to build expressive, open web
experiences.

— Joe (`trusktr`)
