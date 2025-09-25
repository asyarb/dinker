import { PlacesClient } from "@googlemaps/places"
import pMap from "p-map"
import * as prettier from "prettier"
import raw from "./raw.json"

type Court = (typeof raw)[number]

const FIELDS = [
	"places.id",
	"places.location",
	"places.formattedAddress",
	"places.googleMapsUri",
]

const SEARCH_TEXT_ARGS = {
	otherArgs: { headers: { "X-Goog-FieldMask": FIELDS.join(",") } },
}

const places = new PlacesClient({ apiKey: import.meta.env.GOOGLE_API_KEY })

async function getCourtLocation(court: Court) {
	console.info(`Finding info for: ${court.name}...`)

	const [response] = await places.searchText(
		{ textQuery: court.name, maxResultCount: 1 },
		SEARCH_TEXT_ARGS,
	)

	const place = response.places?.at(0)

	return {
		...court,
		id: place?.id,
		location: place?.location,
		address: place?.formattedAddress,
		uri: place?.googleMapsUri,
	}
}

const result = await pMap(raw, getCourtLocation, { concurrency: 5 })
const json = JSON.stringify(result)
const data = await prettier.format(json, { parser: "json" })

await Bun.write("./src/assets/parks.json", data)
