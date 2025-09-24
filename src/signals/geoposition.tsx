import { createSignal } from "solid-js"

export const [geoposition, setGeoposition] =
	createSignal<GeolocationCoordinates | null>(null)

export async function askForGeoposition() {
	const { promise, reject, resolve } =
		Promise.withResolvers<GeolocationCoordinates>()

	navigator.geolocation.getCurrentPosition(
		(position) => {
			setGeoposition(position.coords)
			resolve(position.coords)
		},
		(error) => reject(error.message),
		{ enableHighAccuracy: true, timeout: 10_000, maximumAge: 0 },
	)

	return promise
}
