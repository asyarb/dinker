import { cx } from "cva"
import { ChevronDownIcon } from "../icons/chevron-down"

type Props = {
	class?: string
}

export const Filters = (props: Props) => {
	return (
		<div class={cx(props.class, "flex gap-2")}>
			<div class="relative">
				<select class="appearance-none rounded-md bg-zinc-200 py-1.5 pr-8 pl-3 text-sm font-medium text-zinc-700">
					<option disabled value="" selected>
						Sort by
					</option>
					<option value="relevance">Relevance</option>
					<option value="distance">Distance</option>
				</select>
				<ChevronDownIcon class="pointer-events-none absolute top-1/2 right-2 size-5 -translate-y-1/2" />
			</div>

			<button class="rounded-md bg-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700">
				Has Lights
			</button>

			<button class="rounded-md bg-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700">
				Dedicated Courts
			</button>
		</div>
	)
}
