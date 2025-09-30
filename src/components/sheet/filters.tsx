import { cx } from "cva"
import { type JSX } from "solid-js"
import {
	useDedicatedFilter,
	useLightsFilter,
	useSortFilter,
} from "@/signals/filters"
import { button } from "@/styles/button"
import { ChevronDownIcon } from "../icons/chevron-down"
import { DedicatedIcon } from "../icons/dedicated"
import { LightsIcon } from "../icons/lights"

const ToggleButton = (props: {
	children: JSX.Element
	active: boolean
	onClick: () => void
	label: string
}) => {
	return (
		<button
			data-active={props.active}
			aria-label={props.label}
			class={button({ style: "secondary" })}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	)
}

type Props = {
	class?: string
}

export const Filters = (props: Props) => {
	const dedicated = useDedicatedFilter()
	const lights = useLightsFilter()
	const sort = useSortFilter()

	return (
		<div class={cx(props.class, "flex items-center gap-2")}>
			<div class="relative -mx-3.5 -my-3 scrollbar-hide shrink-0 justify-start overflow-auto px-3.5 py-3">
				<select
					class="appearance-none rounded-md border border-zinc-200 bg-zinc-200 py-1.5 pr-7 pl-3 text-xs font-medium transition ease-out hover:border-zinc-300 hover:bg-zinc-300 dark:border-zinc-800 dark:bg-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-700"
					onInput={(e) => sort.update(e.target.value)}
				>
					<option disabled value="" selected>
						Sort by
					</option>
					<option value="relevance">Relevance</option>
					<option value="distance">Distance</option>
				</select>
				<ChevronDownIcon class="pointer-events-none absolute top-1/2 right-4.5 size-4 -translate-y-1/2" />
			</div>

			<ToggleButton
				active={lights.enabled()}
				onClick={lights.toggle}
				label={
					lights.enabled()
						? "View parks with or without lights"
						: "View parks with lights"
				}
			>
				<LightsIcon class="size-3.5" />
				Has Lights
			</ToggleButton>

			<ToggleButton
				active={dedicated.enabled()}
				onClick={dedicated.toggle}
				label={
					dedicated.enabled()
						? "View parks regardless of court type"
						: "View courts with dedicated nets"
				}
			>
				<DedicatedIcon class="size-3.5" />
				Dedicated Courts
			</ToggleButton>
		</div>
	)
}
