import React from "react"
import { Table } from "antd"
import type { Block } from "../types/app.types"
import type { TableProps } from "antd"

const AntdTable: React.FC<{
    data: Block[]
    columns: TableProps<Block>["columns"]
}> = ({ data, columns }) => {
    return <Table<Block> columns={columns} dataSource={data} />
}

export default AntdTable
