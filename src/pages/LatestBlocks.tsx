import { useEffect, useState } from "react"
import alchemySDK from "../utils/alchemy"

type Block = {
    number: number
    hash: string
    timestamp: number
    txns: number
}

export default function LatestBlocks() {
    const [blocks, setBlocks] = useState<Block[]>([])

    useEffect(() => {
        async function getLatestBlocks() {
            try {
                const latestBlockNumber = await alchemySDK.core.getBlockNumber()
                const blockPromises = []

                // Get the latest 10 blocks
                for (let i = 0; i < 10; i++) {
                    const blockNumber = latestBlockNumber - i
                    blockPromises.push(alchemySDK.core.getBlock(blockNumber))
                }

                const blockResponses = await Promise.all(blockPromises)

                const blocksData: Block[] = blockResponses.map((block) => ({
                    ...block,
                    txns: block.transactions.length,
                }))

                setBlocks(blocksData)
            } catch (error) {
                console.error("Error fetching blocks:", error)
            }
        }

        getLatestBlocks()
    }, [])

    return (
        <div className="App">
            <h2>Latest Ethereum Blocks</h2>
            {blocks.length === 0 ? (
                <p>Loading blocks...</p>
            ) : (
                <div>
                    {blocks.map((block) => (
                        <div
                            key={block.hash}
                            style={{
                                border: "1px solid #ccc",
                                margin: "10px 0",
                                padding: "10px",
                                borderRadius: "5px",
                            }}
                        >
                            <p>
                                <strong>Block Number:</strong> {block.number}
                            </p>
                            <p>
                                <strong>Hash:</strong> {block.hash}
                            </p>
                            <p>
                                <strong>Timestamp:</strong>{" "}
                                {new Date(
                                    block.timestamp * 1000
                                ).toLocaleString()}
                            </p>
                            <p>
                                <strong>Transactions:</strong>{" "}
                                {block.txns}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
