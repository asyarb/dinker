import { cva } from "cva"

export const button = cva({
	base: "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border font-medium transition ease-out",
	variants: {
		size: {
			default: "px-3 py-1.5 text-xs",
		},
		style: {
			primary:
				"border-zinc-950 bg-zinc-950 text-white hover:border-zinc-700 hover:bg-zinc-700 dark:border-white dark:bg-white dark:text-zinc-950 dark:hover:border-zinc-300 dark:hover:bg-zinc-300",
			secondary:
				"border-zinc-200 bg-zinc-200 hover:border-zinc-300 hover:bg-zinc-300 data-[active=true]:border-blue-200 data-[active=true]:bg-blue-200 data-[active=true]:hover:border-blue-300 data-[active=true]:hover:bg-blue-300 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white dark:hover:border-zinc-700 dark:hover:bg-zinc-700 dark:data-[active=true]:border-blue-900 dark:data-[active=true]:bg-blue-900 dark:data-[active=true]:hover:border-blue-800 dark:data-[active=true]:hover:bg-blue-800",
			outline:
				"bg-white text-zinc-950 hover:bg-black/5 dark:bg-black dark:text-white dark:hover:bg-white/5",
		},
	},
	defaultVariants: {
		size: "default",
		style: "primary",
	},
})
