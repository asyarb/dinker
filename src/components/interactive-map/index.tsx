import "mapbox-gl/dist/mapbox-gl.css"
import { useColorMode } from "@kobalte/core"
import mapboxgl from "mapbox-gl"
import { createContext, createEffect, onMount } from "solid-js"
import { MapT } from "./types"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

type MapContextValue = { map?: mapboxgl.Map }

const MapContext = createContext<MapContextValue>({})

export const InteractiveMap = () => {
	const { colorMode } = useColorMode()

	let container!: HTMLDivElement
	let map: mapboxgl.Map | undefined

	onMount(() => {
		map = new mapboxgl.Map({
			container,
			zoom: 16.5,
			bearing: 0,
			pitch: 58,
			center: {
				lat: 21.30293,
				lng: -157.85646,
			},
			cooperativeGestures: false,
			config: {
				basemap: {
					lightPreset:
						colorMode() === "light"
							? MapT.LightPreset.Day
							: MapT.LightPreset.Night,
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
	})

	createEffect(() => {
		map?.setConfigProperty(
			"basemap",
			"lightPreset",
			colorMode() === "light" ? MapT.LightPreset.Day : MapT.LightPreset.Night,
		)
	})

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={container} class="h-full" />
		</MapContext.Provider>
	)
}

export default InteractiveMap
