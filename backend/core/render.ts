import { Layout } from './locate.js'

export type svgRendererOption = {
	unitLen?: number,
	paddingX?: number,
	paddingY?: number,
	displayBonds?: boolean,
	bondPadding?: number
}

export function renderSVG(l: Layout, {
	unitLen = 30,
	paddingX = 20,
	paddingY = 20,
	displayBonds = true,
	bondPadding: bp = 0.2
} : svgRendererOption = {}): string {
	let svg = ''

	const width = l.width * unitLen + paddingX * 2
	const height = l.height * unitLen + paddingY * 2

	svg += `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`
	svg += `<style>text { text-anchor: middle; dominant-baseline: middle; }</style>`

	const X = (x: number) => (x + l.offsetX) * unitLen + paddingX
	const Y = (y: number) => (y + l.offsetY) * unitLen + paddingY

	for (const { x, y, g } of l.groups) {
		if (g === '*') continue
		svg += `<text x="${X(x)}" y="${Y(y)}">${g}</text>`
	}

	if (displayBonds) for (let { x1, y1, x2, y2, c } of l.bonds) {
		if (x2 !== x1) x1 += bp * (x2 - x1)
		if (y2 !== y1) y1 += bp * (y2 - y1)
		if (x2 !== x1) x2 -= bp * (x2 - x1)
		if (y2 !== y1) y2 -= bp * (y2 - y1)
		const ln = (attr: string) => `<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" ${attr}></line>`
		if (c === 1) svg += ln(`stroke="black"`)
		else if (c === 2) {
			svg += ln(`stroke="black" stroke-width="4"`)
			svg += ln(`stroke="white" stroke-width="2"`)
		}
	}

	svg += '</svg>'

	return svg
}
