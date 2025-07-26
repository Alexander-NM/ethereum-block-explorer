import React from "react"
import { Table } from "antd"
import type { BlockProperties } from "../../../types/app.types"
import type { TableProps } from "antd"
import { Link } from "react-router"

export const BlocksDetailsTable: React.FC<{
    data: BlockProperties[]
    blockNumber?: string
}> = ({ data, blockNumber }) => {
    function tableColumns(): TableProps<BlockProperties>["columns"] {
        return [
            {
                title: "Property",
                dataIndex: "property",
                key: "property",
            },
            {
                title: "Value",
                dataIndex: "value",
                key: "value",
                render: (text, record) => {
                    if (record.property === "Transactions") {
                        return (
                            <Link to={`/blocks/block/${blockNumber}/txs`}>
                                {text}
                            </Link>
                        )
                    }
                    return text
                },
            },
        ]
    }

    return (
        <Table<BlockProperties>
            columns={tableColumns()}
            dataSource={data}
            showHeader={false}
            pagination={false}
        />
    )
}
