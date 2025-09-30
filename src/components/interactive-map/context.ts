import { createContext, useContext, type Accessor } from "solid-js"

export type MapContextValue = { map: Accessor<mapboxgl.Map> }
export const MapContext = createContext<MapContextValue>(undefined!)

export const useMapContext = () => {
	const ctx = useContext(MapContext)
	if (!ctx) {
		throw new Error("Tried to use 'useMapContext' outside of a provider.")
	}

	return ctx
}
