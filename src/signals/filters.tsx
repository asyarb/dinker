import { useSearchParams, type NavigateOptions } from "@solidjs/router"
import type { LiteralUnion } from "prettier"
import { createMemo } from "solid-js"
import z from "zod"

const SET_OPTIONS: Partial<NavigateOptions> = { replace: true, scroll: false }

const useBooleanSearchParam = (key: string) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const enabled = createMemo(() => searchParams[key] === "true")

	function toggle() {
		setSearchParams({ [key]: enabled() ? null : "true" }, SET_OPTIONS)
	}

	return { enabled, toggle }
}

export const useDedicatedFilter = () => useBooleanSearchParam("dedicated")
export const useLightsFilter = () => useBooleanSearchParam("lights")

export const useQueryFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams<{ query: string }>()

	const value = createMemo(() => searchParams.query ?? "")

	function update(value: string) {
		setSearchParams({ query: value }, SET_OPTIONS)
	}

	return { value, update }
}

const Sort = z
	.union([z.literal("distance"), z.literal("relevance")])
	.catch("relevance")
	.default("relevance")
type Sort = z.infer<typeof Sort>

export const useSortFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams<{ sort: Sort }>()

	const value = createMemo(() => Sort.parse(searchParams.sort))

	function update(sort: LiteralUnion<Sort, string>) {
		setSearchParams(
			{ sort: sort === "relevance" ? null : Sort.parse(sort) },
			SET_OPTIONS,
		)
	}

	return { value, update }
}
