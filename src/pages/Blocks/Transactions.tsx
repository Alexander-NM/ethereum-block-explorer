import { useParams } from "react-router"
import type { Transaction } from "../../types/app.types"
import { useEffect, useState } from "react"
import { getBlockTransactions } from "../../utils/alchemy"
import { TransactionsTable } from "../../components/UI/Tables/TransactionsTable"
import { formatEther } from "../../utils/alchemy"

export default function Transactions() {
    const { blockNumber } = useParams<{ blockNumber: string }>()
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        async function fetchTransactions() {
            if (!blockNumber) return

            const txs = await getBlockTransactions(Number(blockNumber))
            if (!txs) return
            console.log("Fetched transactions:", txs)
            setTransactions(
                txs.map((tx) => ({
                    hash: tx.hash,
                    blockNumber: tx.blockNumber,
                    confirmations: tx.confirmations,
                    from: tx.from,
                    to: tx.to,
                    value:
                        formatEther(parseInt(tx.value._hex, 16).toString()) +
                        " ETH", // Convert wei to ETH
                }))
            )
        }
        fetchTransactions()
    }, [blockNumber])

    if (!blockNumber) {
        return <div>Error: Block number is required.</div>
    }

    return (
        <>
            <h2>Transactions in block {blockNumber}</h2>
            {transactions.length === 0 ? (
                <p>Loading transactions...</p>
            ) : (
                <TransactionsTable data={transactions} />
            )}
        </>
    )
}
