import { useColorMode } from "@kobalte/core"
import { MoonIcon } from "../icons/moon"
import { SunIcon } from "../icons/sun"

export const ThemeToggle = () => {
	const { colorMode, toggleColorMode } = useColorMode()

	const label = () =>
		`Change to ${colorMode() === "dark" ? "light mode" : "dark mode"}`

	return (
		<button
			onClick={toggleColorMode}
			title={label()}
			class="absolute -top-2 left-2 inline-flex size-10 -translate-y-full items-center justify-center rounded bg-white text-zinc-500 shadow transition ease-out hover:bg-zinc-100 active:scale-90 active:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
		>
			<span class="sr-only">{label()}</span>
			{colorMode() === "dark" ? (
				<SunIcon class="size-6" />
			) : (
				<MoonIcon class="size-6" />
			)}
		</button>
	)
}
