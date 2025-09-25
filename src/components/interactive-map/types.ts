export namespace MapT {
	export enum LightPreset {
		Dawn = "dawn",
		Day = "day",
		Night = "night",
		Dusk = "dusk",
	}

	export type Court = {
		name: string
		courts: {
			dedicated: number
			other: number
		}
		lights: boolean
		id: string
		location: {
			latitude: number
			longitude: number
		}
		address: string
		uri: string
	}
}
