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
import { ExternalIcon } from "../icons/external"
import type { MapT } from "../interactive-map/types"
import { DRAWER_SNAP_POINTS } from "./constants"

const Park = (
	props: Pick<MapT.Park, "name" | "courts" | "address" | "uri">,
) => {
	return (
		<li class="flex flex-col items-start border-b border-zinc-300 px-3.5 py-3 first:pt-0 last:border-b-0 dark:border-zinc-700">
			<div>
				<h3 class="text-base font-medium">{props.name}</h3>
				<p class="text-sm text-zinc-500 dark:text-zinc-400">{props.address}</p>
			</div>

			<a
				href={props.uri}
				target="_blank"
				class="mt-3 inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-medium text-white transition ease-out hover:bg-zinc-700 active:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300 dark:active:bg-zinc-300"
			>
				<ExternalIcon class="size-3" />
				More Info
			</a>
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
				class="scrollbar-hide h-full overscroll-contain border-t pt-3 pb-12 data-[at-top=false]:border-zinc-300 data-[at-top=true]:border-transparent data-[scrollable=false]:overflow-hidden data-[scrollable=true]:overflow-auto data-[at-top=false]:dark:border-zinc-700"
			>
				<For each={parks()}>
					{(park) => (
						<Park
							name={park.name}
							courts={park.courts}
							address={park.address}
							uri={park.uri}
						/>
					)}
				</For>
			</ul>
		</div>
	)
}
