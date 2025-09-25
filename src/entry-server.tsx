// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang="en" class="h-full">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />

					<link rel="icon" href="https://fav.farm/🏓" />
					<link rel="preconnect" href="https://rsms.me/" />
					<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

					{assets}
				</head>

				<body class="h-full bg-zinc-100 text-zinc-950 dark:bg-black dark:text-white">
					<div id="app" class="h-full">
						{children}
					</div>

					{scripts}
				</body>
			</html>
		)}
	/>
))
