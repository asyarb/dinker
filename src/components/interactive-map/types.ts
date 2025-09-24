export namespace MapT {
	export enum LightPreset {
		Dawn = "dawn",
		Day = "day",
		Night = "night",
		Dusk = "dusk",
	}

	export type Park = {
		name: string
		courts: {
			dedicated: number
			other: number
		}
		lights: boolean
	}
}
