import { createContext, useContext } from "solid-js"

export type MapContextValue = { map?: mapboxgl.Map }
export const MapContext = createContext<MapContextValue>({})

export const useMapContext = () => useContext(MapContext)
