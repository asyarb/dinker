import { createSignal } from "solid-js"

export const [geoposition, setGeoposition] =
	createSignal<GeolocationCoordinates | null>(null)
