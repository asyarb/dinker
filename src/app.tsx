import "./app.css"
import { ColorModeProvider, ColorModeScript } from "@kobalte/core"
import { MetaProvider } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense, type ParentComponent } from "solid-js"

const Root: ParentComponent = (props) => (
	<MetaProvider>
		<Suspense>
			<ColorModeScript />
			<ColorModeProvider disableTransitionOnChange>
				{props.children}
			</ColorModeProvider>
		</Suspense>
	</MetaProvider>
)

export default function App() {
	return (
		<Router preload root={Root}>
			<FileRoutes />
		</Router>
	)
}
