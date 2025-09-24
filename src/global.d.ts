/// <reference types="@solidjs/start/env" />

interface ViteTypeOptions {
	// By adding this line, you can make the type of ImportMetaEnv strict
	// to disallow unknown keys.
	// strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
	readonly VITE_MAPBOX_TOKEN: string
	readonly GOOGLE_API_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
