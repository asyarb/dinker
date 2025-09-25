import { cx } from "cva"
import { type JSX } from "solid-js"
import {
	useDedicatedFilter,
	useLightsFilter,
	useSortFilter,
} from "@/signals/filters"
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
			class="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-zinc-200 px-3 py-1.5 text-sm font-medium transition ease-out hover:bg-zinc-300 data-[active=true]:bg-blue-200 data-[active=true]:hover:bg-blue-300 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:data-[active=true]:bg-blue-900 dark:data-[active=true]:hover:bg-blue-800"
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
					class="appearance-none rounded-md bg-zinc-200 py-1.5 pr-7 pl-3 text-sm font-medium transition ease-out dark:bg-zinc-800 dark:hover:bg-zinc-700"
					onInput={(e) => sort.update(e.target.value)}
				>
					<option disabled value="" selected>
						Sort by
					</option>
					<option value="relevance">Relevance</option>
					<option value="distance">Distance</option>
				</select>
				<ChevronDownIcon class="pointer-events-none absolute top-1/2 right-4.5 size-5 -translate-y-1/2" />
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
				<LightsIcon class="size-4" />
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
				<DedicatedIcon class="size-4" />
				Dedicated Courts
			</ToggleButton>
		</div>
	)
}
