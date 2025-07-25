import { useEffect, useState } from "react"
import type { Block } from "../types/app.types"
import AntdTable from "../components/Table"
import { getLatestBlocks } from "../utils/alchemy"
import { Button, InputNumber, Space, type TableProps } from "antd"
import { Link } from "react-router"
import { IoCubeOutline } from "react-icons/io5"

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

    function tableColumns(): TableProps<Block>["columns"] {
        return [
            {
                title: "Block Number",
                dataIndex: "number",
                key: "number",
                render: (text) => (
                    <div className="block-number">
                        <IoCubeOutline size={16} />
                        <Link to={`block/${text}`}>{text}</Link>
                    </div>
                ),
            },
            {
                title: "Timestamp",
                dataIndex: "timestamp",
                key: "timestamp",
            },
            {
                title: "Transactions",
                dataIndex: "txs",
                key: "txs",
                render: (text, { number }) => (
                    <Link to={`block/${number}/txs`}>{text}</Link>
                ),
            },
        ]
    }

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
                <AntdTable data={blocks} columns={tableColumns()} />
            )}
        </>
    )
}
