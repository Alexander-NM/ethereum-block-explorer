import React from "react"
import { Table } from "antd"
import type { AccountTransactions } from "../../../types/app.types"
import type { TableProps } from "antd"
import { Link } from "react-router"
import { Address } from "@ant-design/web3"

export const AccountHistoryTable: React.FC<{
    data: AccountTransactions[]
}> = ({ data }) => {
    function tableColumns(): TableProps<AccountTransactions>["columns"] {
        return [
            {
                title: "Asset",
                dataIndex: "asset",
                key: "asset",
            },
            {
                title: "From",
                dataIndex: "from",
                key: "from",
                render: (text) => <Address ellipsis address={text} />,
            },
            {
                title: "To",
                dataIndex: "to",
                key: "to",
                render: (text) => (
                    <Link to={`/account/${text}`} state={{ address: text }}>
                        {<Address ellipsis address={text} copyable />}
                    </Link>
                ),
            },

            {
                title: "Block Number",
                dataIndex: "blockNum",
                key: "blockNum",
                render: (text) => (
                    <Link to={`/blocks/block/${text}`}>{text}</Link>
                ),
            },
            {
                title: "Category",
                dataIndex: "category",
                key: "category",
            },
            {
                title: "Value",
                dataIndex: "value",
                key: "value",
            },
        ]
    }
    return (
        <Table<AccountTransactions>
            columns={tableColumns()}
            dataSource={data}
        />
    )
}
