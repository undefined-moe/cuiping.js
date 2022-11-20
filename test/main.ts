import { Debug } from '../utils/debug.js'
import { ChemParser } from '../core/parse.js'
import { expandAggregateBonds } from '../core/expand.js'
import { locate } from '../core/locate.js'

export function testChem(input: string) {
	const parser = new ChemParser(input)

	try {
		const chem = parser.parse()
		Debug.O(chem)

		const chemEx = expandAggregateBonds(chem, 0)
		Debug.O(chemEx)

		const layout = locate(chemEx)
		Debug.O(layout)
	}
	catch (err) {
		Debug.E(
			Debug.on ? (err as Error).stack : err
		)
	}
}
