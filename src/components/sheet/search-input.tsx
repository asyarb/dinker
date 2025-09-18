import { useSearchParams } from "@solidjs/router"
import { cx } from "cva"
import { MagnifyingGlassIcon } from "../icons/magnifying-glass"

type Props = {
	class?: string
}

export const SearchInput = (props: Props) => {
	const [searchParams, setSearchParams] = useSearchParams<{ query: string }>()
	const query = searchParams.query ?? ""

	return (
		<div class={cx("relative", props.class)}>
			<input
				type="search"
				name="query"
				class="h-7 w-full rounded-md bg-zinc-800 pr-6 pl-3 text-base outline-blue-500 placeholder:text-sm"
				placeholder="Search..."
				value={query}
				onInput={(e) =>
					setSearchParams(
						{ query: e.currentTarget.value },
						{ replace: true, scroll: false },
					)
				}
			/>
			<MagnifyingGlassIcon class="absolute top-1/2 right-2 size-4 -translate-y-1/2 text-zinc-400" />
		</div>
	)
}
