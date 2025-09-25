import { askForGeoposition } from "@/signals/geoposition"
import { LocateIcon } from "../icons/locate"

export const FindNearestButton = () => {
	const label = "Find nearest court"

	return (
		<button
			title={label}
			class="absolute -top-2 right-3.5 inline-flex size-10 -translate-y-full items-center justify-center rounded bg-white text-zinc-500 shadow transition ease-out hover:bg-zinc-100 active:scale-90 active:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
			onClick={askForGeoposition}
		>
			<span class="sr-only">{label}</span>
			<LocateIcon class="size-6" />
		</button>
	)
}
