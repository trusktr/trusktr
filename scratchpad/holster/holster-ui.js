import {Element, element, attribute, html, signalify, createMemo} from 'lume'
import {stringToArray} from 'lume/dist/xyz-values/utils.js'

class _HolsterUI extends Element {
	static observedAttributeHandlers = {
		leatherColors: attribute.string,
	}

	leatherColors = 'red green blue'

	/** @type {() => string[]} */
	#colorsArray = () => stringToArray(this.leatherColors)

	selectedBeltColor = 'red'
	selectedHolsterColor = 'green'

	constructor() {
		super()

		signalify(this, 'leatherColors', 'selectedBeltColor', 'selectedHolsterColor')

		this.#colorsArray = createMemo(this.#colorsArray)
	}

	connectedCallback() {
		super.connectedCallback()
		console.log('CONNECTED')

		this.createEffect(() => {
			console.log('this.selectedBeltColor', this.selectedBeltColor)
			console.log('this.selectedHolsterColor', this.selectedHolsterColor)
		})
	}

	/** @returns {Node | Node[]} */
	template = () => html`
		<label>Belt color:</label>
		<div class="colors">
			${() =>
				this.#colorsArray().map(
					color => html`
						<button
							class=${() => 'color' + (this.selectedBeltColor === color ? ' active' : '')}
							style=${`--color: ${color}`}
							on:click=${() => (this.selectedBeltColor = color)}
						></button>
					`,
				)}
		</div>

		<label>Holster color:</label>
		<div class="colors">
			${() =>
				this.#colorsArray().map(
					color => html`
						<button
							class=${() => 'color' + (this.selectedHolsterColor === color ? ' active' : '')}
							style=${`--color: ${color}`}
							on:click=${() => (this.selectedHolsterColor = color)}
						></button>
					`,
				)}
		</div>
	`

	/** @type {string} */
	css = /*css*/ `
            :host {
                color: black;

                backdrop-filter: blur(20px);
                background: rgb(242, 241, 238);
                padding: 10px;
                border-radius: 10px;
            }

            label {
                font-size: 1.5rem;
            }

            label:not(:first-of-type) {
                display: inline-block;
                margin-top: 10px;
            }

            .colors {
                display: flex;
                gap: 5px;
            }

            .color {
                box-sizing: border-box;
                width: 50px;
                height: 50px;
                display: inline-block;
                background: var(--color);
                border-radius: 5px;
                border: none;
                cursor: pointer;
            }

            .color.active {
                border: 3px solid color-mix(in srgb, var(--color), white 40%);
            }
        `
}

export const HolsterUI = element('holster-ui')(_HolsterUI)
/** @typedef {InstanceType<typeof HolsterUI>} HolsterUI */
