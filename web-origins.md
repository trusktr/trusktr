I've been passionate about web technology for a good while now! This is a rough
draft that may evolve endlessly, on how I got to where I am today in web
development!

I started pasting my first scripts onto web sites back in high school (I'm now
39). At that time, I was also working on 3D modeling for game mods, in
particular a World War 2 mod for Command and Conquer Renegade; I didn't have a
particular goal, I was just doing what I found interesting.

I was also skateboarding a lot, for probably most of my time outside of school.
I started skating at 14, and I still skate! There's a chance I may die skating
(of old age, of course!).

At around 18 is when I really started to learn web development when I decided to
build a website for a Peruvian skate shoe company called [Betta
Footwear](https://www.betta-footwear.com) (I'm half Peruvian and I speak
Spanish!).

While fiddling with WordPress PHP templates, I found a tutorial on how to
[AJAX](<https://en.wikipedia.org/wiki/Ajax_(programming)>)ify a Wordpress website
using [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and
[jQuery](https://jquery.com). It was MAGIC that made me feel like a sorcerer!
All of a sudden, static websites turned into dynamic experiences.

I floated around in the Cosumnes River College district for a bit after high
school, still skating a ton, trying to sell Betta (and in "better") skate shoes
in the states (I failed miserably with no idea how to run a business let alone
sell anything), not sure what to pursue in school and dreaming of being a pro
skater while studying material science to possibly make a new type of skateboard
lighter than wood with more impact absorption that doesn't break (a good idea
actually, maybe someone will do it some day!).

In late 2008 I broke my upper arm in a freak accident performing a small trick
on a miniramp at the [28th and B
skatepark](https://goskate.com/sp/listing/28th-and-b-skatepark-sacramento-ca).
Luckily and oddly, the spiral fracture was almost painless. I thought I'd
dislocated my arm, so I was pulling on it and asking people to pull on it to try
to relocate it. There was such a lack of pain, that I didn't realize it was
broken!

I spent all of 2009 off my board, at home, and for some a random reason, I got
into [Linux](https://wikipedia.org/wiki/Linux) for the first time. It must have
been the prior AJAX magic still lingering in the air!

Specifically, I jumped into the deep end with [Arch
Linux](https://archlinux.org) after researching [Linux](https://archcraft.io)
[distros](https://www.youtube.com/watch?v=iHDuoOtFtEY), and I had a blast
learning how to set up my very own custom OS with one hand (the other in a
sling). I discovered a rich world of custom computing ([custom
desktops](https://www.reddit.com/r/unixporn) broken out of the UX confinements
of Windows or MacOS (not yet macOS)). I fell in love with the open source
community through this experience because everything I learned for controlling
my computing experience was free, open, and a gift that opened up my learning
path that turned into my career.

I had already been learning PHP, ASP, JavaScript, and jQuery prior to Linux, but
that year was a real trigger: in 2010 I decided to pursue computer science after
my awesome year of Linux, and I moved on from material science. I ended up
having a concentration in cyber security due to the requirements of a
scholarship at California State University, Sacramento. The career path finally
found me, and I _finally_ got my degree in 2014 in a timely manner (_only_ 10
years after high school at 27).

I got into web 3D graphics by dabbling with
[Three.js](https://github.com/mrdoob/three.js), and
[Famo.us](https://github.com/famous/famous) (now defunct), in 2013 and 2014 as I
wrapped up my degree. UIs and graphics were the area I came to enjoy most:
making experiences that people could interact with directly was fascinating, not
only in its technical aspects, but as a form of expression and art.

In 2015 I started a project that is today called [Lume](https://lume.io): a
library of HTML elements for crafting 3D experiences, and a set of libraries for
easily creating further elements for expansion of the library.

<!--
At first Lume was based on CSS 3D, then I started making my own WebGL engine.
Making an engine from scratch was a great learning experience, but when I
realized that as a hobbyist working a full time job I'd never have the time to
catch up to the capabilities of a library like Three.js with all of its active
contributors, I decided to adopt Three.js as the 3D rendering layer below Lume's
3D elements, to build the ideal 3D framework with the lowest barrier to entry
possible.
-->

At the beginning of Lume's days, when it was called Infamous (in homage to and
in pairing with Famo.us), I'd started making 3D components with
[React](https://react.dev). However I soon discovered the web specs for [Custom
Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
i.e. Web Components (nascent at the time), and I quickly realized Custom
Elements were the future: why make a thing that only a limited set of people
locked into a single framework could use, when I could provide everyone with
elements usable in every web app no matter the framework? I was enamored by the
idea, and I went all in on Custom Elements.

While working on Lume, I discovered a project named
[Solid.js](https://solidjs.com) started by [Ryan
Carniato](https://github.com/ryansolid), and I became a contributor in its
early days before it blew up and popularized the reactivity pattern that it
dubbed "signals and effects" that most web frameworks have since adopted and
that in turn helped indirectly lead to the creation the [TC39 Signals
proposal](https://github.com/tc39/proposal-signals).

Eventually I abstracted Lume's custom element definition system into a separate
library published as [`@lume/element`](https://github.com/lume/element), powered
by reactivity and templating from Solid.js. The `@lume/element` library is
essentially an alternative to libraries like [Lit](https://lit.dev/),
[Atomico](https://atomicojs.dev), [Stencil](https://stenciljs.com), and [other
libraries](https://github.com/web-padawan/awesome-web-components) that simplify
the authoring of custom elements for any purpose.

The use of Solid.js in Lume allows for 3D custom HTML elements to be authored
with declarative-reactive templating without any notable downside to
performance, in contrast to the vdom diffing strategies of React and similar
libraries that come with higher CPU costs due to constant allocation and garbage
collection caused by immutable update patterns.

<!--
Lume's ability to animate 3D elements via declarative expressions performantly,
with help from Solid.js, is in contrast to 3D libraries like
[react-three-fiber](https://r3f.docs.pmnd.rs) for React that recommend users
avoid animating 3D components via declarative-reactive JSX templates due to vdom
diffing costs, essentially defeating the purpose of having a declarative
template system to begin with.
-->

Lume and its libraries have been largely a free time project, though I've used
the libraries in select work projects. As part of my work on Lume, I've enjoyed
participating in conversations revolving around web standards, custom elements,
and web technology in general. In my participation in the [Web Components
Community Group](https://github.com/w3c/webcomponents-cg) I've gotten the
opportunity to meet and ideate with people on how certain web standards may
evolve. Anyone can join, so [please do](https://discord.gg/UkF7KacF8J) if you'd
like to chat about and stay in the loop on progress of standards around
organizing web code using Custom Elements!
