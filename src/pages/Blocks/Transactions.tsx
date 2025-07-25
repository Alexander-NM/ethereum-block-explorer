import { useParams } from "react-router"

export default function Transactions() {
    const { blockNumber } = useParams<{ blockNumber: string }>()
    return <div>Transactions for Block: {blockNumber}</div>
}
