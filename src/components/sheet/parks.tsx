import { useContext as useDrawerContext } from "@corvu/drawer"
import { cx } from "cva"
import { createMemo, createSignal, For } from "solid-js"
import allParks from "@/assets/parks.json"
import {
	useDedicatedFilter,
	useLightsFilter,
	useQueryFilter,
} from "@/signals/filters"

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

		const q = query.value().toLowerCase()
		if (q.length >= 1) {
			visible = visible.filter((p) =>
				p.name.toLowerCase().includes(q.toLowerCase()),
			)
		}

		return visible
	})

	const isSheetFullyOpen = createMemo(() => drawer.activeSnapPoint() === 1)

	return (
		<div class={cx(props.class, "-mx-2.5 grow overflow-hidden px-2.5")}>
			<h2 class="text-lg font-semibold">Parks</h2>

			<ul
				data-at-top={atTop()}
				data-scrollable={isSheetFullyOpen()}
				onScroll={(e) => setAtTop(e.currentTarget.scrollTop === 0)}
				class="-mx-2.5 mt-2.5 scrollbar-hide h-full overscroll-contain border-t px-2.5 pb-12 data-[at-top=false]:border-zinc-300 data-[at-top=true]:border-transparent data-[scrollable=false]:overflow-hidden data-[scrollable=true]:overflow-auto data-[at-top=false]:dark:border-zinc-600"
			>
				<For each={parks()}>{(park) => <li>{park.name}</li>}</For>
			</ul>
		</div>
	)
}
