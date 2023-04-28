import modes from './modes'

const colorPicker = document.getElementById('color-picker')
const modeSelector = document.getElementById('mode-selector')
const getColorSchemeBtn = document.getElementById('get-color-scheme-btn')
const colorScheme = document.getElementById('color-scheme')

renderModes()
generateColorScheme()

function renderModes() {
	modeSelector.innerHTML = modes.map(mode =>
		`<option value="${mode}">${mode}</option>`).join('')
}

getColorSchemeBtn.addEventListener('click', generateColorScheme)

function generateColorScheme() {
	const hex = colorPicker.value.substring(1)
	const mode = modeSelector.value
	const baseURL = 'https://www.thecolorapi.com'
	const endpoint = '/scheme'
	fetch(`${baseURL}${endpoint}?hex=${hex}&mode=${mode}`)
		.then(res => res.json())
		.then(data => {
			colorScheme.innerHTML = data.colors.map(color => {
				const colorHexValue = color.hex.value
				return `
					<div class="color-block flex" 
								onclick="copyColorHexValue(event, '${colorHexValue}')"
								title="Click to copy color hex value to clipboard"
								aria-label="${colorHexValue} click to copy to clipboard"
								>
						<div class="color" style="background-color: ${colorHexValue}">
						</div>
						<div class="color-value flex">
							<p>${colorHexValue}</p>
						</div>
					</div>
				`
			}).join('')
		})
}

/*
 I defined the function in the global scope using "window" so that it's accessible
 by the onclick attribute. This is because I made index.js of type="module" which
 puts all its functions in a separate scope of their own, and not in the global scope.
 */
window.copyColorHexValue = function (event, colorHexValue) {
	const backgroundColor = event.target.style.backgroundColor
	event.target.style.backgroundColor = "gold"
	setTimeout(() => event.target.style.backgroundColor = backgroundColor, 1000)
	navigator.clipboard.writeText(colorHexValue)
}
