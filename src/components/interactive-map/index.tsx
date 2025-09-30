import "mapbox-gl/dist/mapbox-gl.css"
import { useColorMode } from "@kobalte/core"
import mapboxgl from "mapbox-gl"
import { createEffect, createSignal, onMount, type JSX } from "solid-js"
import { MapContext } from "./context"
import { MapT } from "./types"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export const InteractiveMap = (props: { children: JSX.Element }) => {
	const { colorMode } = useColorMode()
	const [map, setMap] = createSignal<mapboxgl.Map>(undefined!)

	let container: HTMLDivElement | undefined

	onMount(() => {
		if (!container) return

		const preset =
			colorMode() === "light" ? MapT.LightPreset.Day : MapT.LightPreset.Night
		const map = new mapboxgl.Map({
			container,
			zoom: 16.5,
			bearing: 0,
			pitch: 50,
			center: {
				lat: 21.30293,
				lng: -157.85646,
			},
			cooperativeGestures: false,
			config: {
				basemap: {
					lightPreset: preset,
					showPedestrianRoads: false,
					showPlaceLabels: false,
					showPointOfInterestLabels: false,
					showRoadLabels: false,
					showTransitLabels: false,
					showAdminBoundaries: false,
					showLandmarkIconLabels: false,
				},
			},
		})

		setMap(map)
	})

	createEffect(() => {
		const preset =
			colorMode() === "light" ? MapT.LightPreset.Day : MapT.LightPreset.Night

		map().setConfigProperty("basemap", "lightPreset", preset)
	})

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={container} class="h-full" />
			{props.children}
		</MapContext.Provider>
	)
}

export default InteractiveMap
