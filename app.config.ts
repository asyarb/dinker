import { defineConfig } from "@solidjs/start/config"
import tailwindcss from "@tailwindcss/vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	server: {
		prerender: {
			routes: ["/"],
		},
	},
	vite: {
		plugins: [tailwindcss(), tsconfigPaths()],
	},
})
