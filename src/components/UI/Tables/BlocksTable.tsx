import React from "react"
import { Table } from "antd"
import type { Block } from "../../../types/app.types"
import type { TableProps } from "antd"
import { Link } from "react-router"
import { IoCubeOutline } from "react-icons/io5"

export const BlocksTable: React.FC<{
    data: Block[]
    
}> = ({ data}) => {

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
    return <Table<Block> columns={tableColumns()} dataSource={data} />
}


