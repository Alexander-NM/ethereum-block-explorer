import { useParams } from "react-router"

export default function BlockDetails() {
    const { blockNumber } = useParams<{ blockNumber: string }>()
    return <div>BlockDetails for Block: {blockNumber}</div>
}
