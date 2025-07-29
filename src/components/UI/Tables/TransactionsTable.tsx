import React from "react"
import { Table } from "antd"
import type { Transaction } from "../../../types/app.types"
import type { TableProps } from "antd"
import { message } from "antd"
import { Link } from "react-router"
import { FaRegCopy } from "react-icons/fa6"
import { IoArrowForwardCircle } from "react-icons/io5"
import { CopyToClipboard } from "react-copy-to-clipboard"

export const TransactionsTable: React.FC<{
    data: Transaction[]
}> = ({ data }) => {
    const [messageApi, contextHolder] = message.useMessage()

    function tableColumns(): TableProps<Transaction>["columns"] {
        return [
            {
                title: "Hash",
                dataIndex: "hash",
                key: "hash",
                render: (text, record) => (
                    <Link
                        to={`/blocks/block/${record.blockNumber}/txns/${text}`}
                    >
                        {text.slice(0, 13)}...
                    </Link>
                ),
            },
            {
                title: "From",
                dataIndex: "from",
                key: "from",

                render: (text) => {
                    return (
                        <div className="address-container">
                            <Link to={`/account/${text}`} >
                                <div className="tooltip-container">
                                    <span className="shortened-text">{`${text.slice(
                                        0,
                                        9
                                    )}...${text.slice(-9)}`}</span>
                                    <span className="tooltip-text">{text}</span>
                                </div>
                            </Link>
                            {contextHolder}
                            <CopyToClipboard
                                text={text}
                                onCopy={() => {
                                    messageApi.open({
                                        type: "success",
                                        content: "Text copied to clipboard!",
                                    })
                                }}
                            >
                                <FaRegCopy className="copy-icon" />
                            </CopyToClipboard>
                        </div>
                    )
                },
            },
            {
                title: "To",
                dataIndex: "to",
                key: "to",
                render: (text) => (
                    <div className="address-container">
                        <IoArrowForwardCircle className="forward-icon" />
                        <Link to={`/account/${text}`}>
                            <div className="tooltip-container">
                                <span className="shortened-text">{`${text.slice(
                                    0,
                                    9
                                )}...${text.slice(-9)}`}</span>
                                <span className="tooltip-text">{text}</span>
                            </div>
                        </Link>
                        {contextHolder}
                        <CopyToClipboard
                            text={text}
                            onCopy={() => {
                                messageApi.open({
                                    type: "success",
                                    content: "Text copied to clipboard!",
                                })
                            }}
                        >
                            <FaRegCopy className="copy-icon" />
                        </CopyToClipboard>
                    </div>
                ),
            },

            {
                title: "Block Number",
                dataIndex: "blockNumber",
                key: "blockNumber",
                render: (text) => (
                    <Link to={`/blocks/block/${text}`}>{text}</Link>
                ),
            },
            {
                title: "Confirmations",
                dataIndex: "confirmations",
                key: "confirmations",
            },
            {
                title: "Value",
                dataIndex: "value",
                key: "value",
                sorter: (a, b) => {
                    const valueA = parseFloat(a.value || "0")
                    const valueB = parseFloat(b.value || "0")
                    return valueA - valueB
                },
            },
        ]
    }
    return <Table<Transaction> columns={tableColumns()} dataSource={data} />
}
