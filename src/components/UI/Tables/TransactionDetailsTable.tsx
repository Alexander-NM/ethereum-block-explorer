import React from "react"
import { Table } from "antd"
import type { TransactionProperties } from "../../../types/app.types"
import type { TableProps } from "antd"
import { Link } from "react-router"

export const TransactionDetailsTable: React.FC<{
    data: TransactionProperties[]
}> = ({ data }) => {
    function tableColumns(): TableProps<TransactionProperties>["columns"] {
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
                render: (value, record) => {
                    if (record.property === "Block Number") {
                        return (
                            <Link
                                to={`/blocks/block/${value}`}
                                className="block-link"
                            >
                                {value}
                            </Link>
                        )
                    }
                    return value
                },
            },
        ]
    }

    return (
        <Table<TransactionProperties>
            columns={tableColumns()}
            dataSource={data}
            showHeader={false}
            pagination={false}
            className="transaction-details-table"
        />
    )
}
