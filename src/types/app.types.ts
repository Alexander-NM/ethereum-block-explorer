import type { BigNumber, TransactionReceipt } from "alchemy-sdk"
import type { AccessList } from "@ethersproject/transactions"

export interface Block {
    key: string
    number: number
    timestamp: string
    txs: number,
}

export interface Transaction {
    hash: string,
    blockNumber?: number,
    confirmations: number,
    from?: string,
    to?: string,
    value?: string,
}

export interface BlockProperties {
    property: string
    value: string | number | string[] | BigNumber | null
}
export interface TransactionProperties {
    property: string
    value: string | number | BigNumber | ((confirmations?: number | undefined) => Promise<TransactionReceipt>) | AccessList | null
    key: string
}
