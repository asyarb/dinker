import { cx } from "cva"
import { useQueryFilter } from "@/signals/filters"
import { MagnifyingGlassIcon } from "../icons/magnifying-glass"

type Props = {
	class?: string
}

export const SearchInput = (props: Props) => {
	const query = useQueryFilter()

	return (
		<div class={cx("relative", props.class)}>
			<input
				type="search"
				name="query"
				class="h-8 w-full rounded-md bg-zinc-200 pr-3 pl-8.5 text-base/none placeholder:text-zinc-500 dark:bg-zinc-800 placeholder:dark:text-zinc-500"
				placeholder="Search..."
				value={query.value()}
				onInput={(e) => query.update(e.currentTarget.value)}
			/>
			<MagnifyingGlassIcon class="absolute top-1/2 left-2 size-5 -translate-y-1/2 text-zinc-800 dark:text-zinc-300" />
		</div>
	)
}
