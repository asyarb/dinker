import { PlacesClient } from "@googlemaps/places"
import pMap from "p-map"
import * as prettier from "prettier"
import raw from "./raw.json"

// TODO: Find a way to generate `raw` via scraping

type Court = (typeof raw)[number]

const SEARCH_TEXT_ARGS = {
	otherArgs: {
		headers: { "X-Goog-FieldMask": "places.location" },
	},
}

const places = new PlacesClient({ apiKey: import.meta.env.GOOGLE_API_KEY })

async function getCourtLocation(court: Court) {
	console.info(`Finding coordinates for: ${court.name}...`)

	const [response] = await places.searchText(
		{ textQuery: court.name, maxResultCount: 1 },
		SEARCH_TEXT_ARGS,
	)

	const location = response.places?.at(0)?.location
	if (location) {
		console.info(
			`Found. Latitude: ${location.latitude}, Longitude: ${location.longitude} `,
		)
	}

	return { ...court, location }
}

const result = await pMap(raw, getCourtLocation, { concurrency: 5 })
const json = JSON.stringify(result)
const data = await prettier.format(json, { parser: "json" })

await Bun.write("./src/assets/courts.json", data)
