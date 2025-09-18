import "./app.css"
import { ColorModeProvider, ColorModeScript } from "@kobalte/core"
import { MetaProvider } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"

export default function App() {
	return (
		<Router
			preload
			root={(props) => (
				<MetaProvider>
					<Suspense>
						<ColorModeScript />
						<ColorModeProvider>{props.children}</ColorModeProvider>
					</Suspense>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	)
}
