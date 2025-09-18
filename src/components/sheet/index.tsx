import Drawer from "@corvu/drawer"
import { SearchInput } from "./search-input"

const SNAP_POINTS = [0.25, 0.5, 1]

export const Sheet = () => {
	return (
		<Drawer
			open
			snapPoints={SNAP_POINTS}
			modal={false}
			defaultSnapPoint={SNAP_POINTS.at(0)}
			allowSkippingSnapPoints={false}
		>
			<Drawer.Portal>
				<Drawer.Content class="fixed inset-x-0 bottom-0 z-50 flex h-full max-h-[calc(100svh-2rem)] flex-col rounded-t-2xl bg-zinc-900 px-2.5 outline-none after:absolute after:inset-x-0 after:top-[calc(100%-1px)] after:h-1/2 after:bg-inherit data-transitioning:transition-transform data-transitioning:duration-500 data-transitioning:ease-[cubic-bezier(0.32,0.72,0,1)] md:select-none">
					<div class="mt-1.5 h-1 w-10 self-center rounded-full bg-zinc-500" />
					<SearchInput class="mt-3" />
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer>
	)
}
