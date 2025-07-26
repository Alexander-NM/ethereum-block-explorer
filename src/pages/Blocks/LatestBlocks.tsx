import { useEffect, useState } from "react"
import type { Block } from "../../types/app.types"
import { BlocksTable } from "../../components/UI/Tables/BlocksTable"
import { getLatestBlocks } from "../../utils/alchemy"
import { InputNumber, Space } from "antd"

export default function LatestBlocks() {
    const [blocks, setBlocks] = useState<Block[]>([])
    const [numberOfBlocks, setNumberOfBlocks] = useState<number | null>(10)

    useEffect(() => {
        async function fetchBlocks() {
            if (numberOfBlocks === null) return

            const blockResponses = await getLatestBlocks(numberOfBlocks)
            if (!blockResponses) return

            setBlocks(
                blockResponses.map((block) => ({
                    number: block.number,
                    timestamp: new Date(
                        block.timestamp * 1000
                    ).toLocaleString(),
                    txs: block.transactions.length,
                    key: block.hash,
                }))
            )
        }
        fetchBlocks()
    }, [numberOfBlocks])

    return (
        <>
            <h2>Latest Ethereum Blocks</h2>
            <Space className="block-number-input">
                Number of blocks:
                <InputNumber
                    min={1}
                    max={100}
                    value={numberOfBlocks}
                    onChange={setNumberOfBlocks}
                />
            </Space>
            {blocks.length === 0 ? (
                <p>Loading blocks...</p>
            ) : (
                <BlocksTable data={blocks} />
            )}
        </>
    )
}
