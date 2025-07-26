export interface Block {
    key: string
    number: number
    timestamp: string
    txs: number
}

export interface Transaction {
    hash: string,
    blockNumber?: number,
    confirmations: number,
    from?: string,
    to?: string,
    value?:  string,
}