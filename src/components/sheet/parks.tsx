import { useContext as useDrawerContext } from "@corvu/drawer"
import { cx } from "cva"
import { createMemo, createSignal, For } from "solid-js"
import allParks from "@/assets/parks.json"
import { normalizeString } from "@/lib/normalize-str"
import {
	useDedicatedFilter,
	useLightsFilter,
	useQueryFilter,
} from "@/signals/filters"
import { button } from "@/styles/button"
import { DirectionsIcon } from "../icons/directions"
import { ExternalIcon } from "../icons/external"
import { useMapContext } from "../interactive-map/context"
import type { MapT } from "../interactive-map/types"
import { DRAWER_SNAP_POINTS } from "./constants"

type ParkProps = Pick<
	MapT.Park,
	"name" | "courts" | "address" | "uri" | "location"
>

const Park = (props: ParkProps) => {
	const { map } = useMapContext()

	function moveMapToParkLocation() {
		map().jumpTo({
			center: [props.location.longitude, props.location.latitude],
		})
	}

	return (
		<li class="relative flex flex-col items-start border-b border-zinc-300 px-3.5 py-3 transition ease-out last:border-b-0 focus-within:bg-zinc-100 hover:bg-zinc-100 dark:border-zinc-700 dark:focus-within:bg-zinc-800 dark:hover:bg-zinc-800">
			<button
				class="absolute inset-0 focus:outline-none"
				onClick={moveMapToParkLocation}
			>
				<span class="sr-only">Jump to {props.name} on the map.</span>
			</button>

			<div class="isolate">
				<h3 class="text-base font-medium">{props.name}</h3>
				<p class="text-sm text-zinc-500 dark:text-zinc-400">{props.address}</p>
			</div>

			<div class="isolate mt-3 flex gap-2">
				<a href={props.uri} target="_blank" class={button()}>
					<ExternalIcon class="size-3" />
					More Info
				</a>

				<a
					href={props.uri}
					target="_blank"
					class={button({ style: "outline" })}
				>
					<DirectionsIcon class="size-3" />
					Directions
				</a>
			</div>
		</li>
	)
}

export const Parks = (props: { class?: string }) => {
	const drawer = useDrawerContext()
	const [atTop, setAtTop] = createSignal(true)

	const lights = useLightsFilter()
	const dedicated = useDedicatedFilter()
	const query = useQueryFilter()

	const parks = createMemo(() => {
		let visible = allParks

		if (lights.enabled()) {
			visible = visible.filter((p) => p.lights)
		}
		if (dedicated.enabled()) {
			visible = visible.filter((p) => p.courts.dedicated > 0)
		}

		const q = normalizeString(query.value())
		if (q.length > 0) {
			visible = visible.filter(
				(p) =>
					normalizeString(p.name).includes(q) ||
					normalizeString(p.address).includes(q),
			)
		}

		return visible
	})

	const isSheetScrollable = createMemo(
		() => drawer.activeSnapPoint() !== DRAWER_SNAP_POINTS.at(0),
	)

	return (
		<div class={cx(props.class, "-mx-3.5 grow overflow-hidden")}>
			<h2 class="mb-3 px-3.5 text-xl font-bold">Parks</h2>

			<ul
				aria-live="polite"
				data-at-top={atTop()}
				data-scrollable={isSheetScrollable()}
				onScroll={(e) => setAtTop(e.currentTarget.scrollTop === 0)}
				class="scrollbar-hide h-full overscroll-contain border-t pb-12 data-[at-top=false]:border-zinc-300 data-[at-top=true]:border-transparent data-[scrollable=false]:overflow-hidden data-[scrollable=true]:overflow-auto data-[at-top=false]:dark:border-zinc-700"
			>
				<For each={parks()}>
					{(park) => (
						<Park
							name={park.name}
							courts={park.courts}
							address={park.address}
							uri={park.uri}
							location={park.location}
						/>
					)}
				</For>
			</ul>
		</div>
	)
}
