import { Title } from "@solidjs/meta"
import { clientOnly } from "@solidjs/start"
import { Sheet } from "@/components/sheet"

const InteractiveMap = clientOnly(() => import("@/components/interactive-map"))

export default function Home() {
	return (
		<>
			<Title>Dinker</Title>
			<InteractiveMap />
			<Sheet />
		</>
	)
}
