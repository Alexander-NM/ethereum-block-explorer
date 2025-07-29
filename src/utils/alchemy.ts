import { Alchemy, AssetTransfersCategory, Network, SortingOrder, Utils } from "alchemy-sdk"

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY
const settings = {
    apiKey: ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
}
const alchemySDK = new Alchemy(settings)

export async function getLatestBlocks(numberOfBlocks = 10) {
    try {
        const latestBlockNumber = await alchemySDK.core.getBlockNumber()
        const blockPromises = []

        for (let i = 0; i < numberOfBlocks; i++) {
            const blockNumber = latestBlockNumber - i
            blockPromises.push(alchemySDK.core.getBlock(blockNumber))
        }

        return await Promise.all(blockPromises)
    } catch (error) {
        console.error("Error fetching blocks:", error)
    }
}

export async function getBlock(blockNumber: number) {
    try {
        const block = await alchemySDK.core.getBlock(blockNumber)
        return block
    } catch (error) {
        console.error("Error fetching block:", error)
    }
}

export async function getBlockTransactions(blockNumber: number) {
    try {
        const block = await alchemySDK.core.getBlockWithTransactions(blockNumber)
        return block.transactions
    } catch (error) {
        console.error("Error fetching transactions for block:", error)
    }
}

export async function getTransaction(txnHash: string) {
    try {
        const transaction = await alchemySDK.core.getTransaction(txnHash)
        return transaction
    } catch (error) {
        console.error("Error fetching transaction:", error)
    }
}

export function formatEther(value: string | number | bigint): string {
    try {
        // If it's already a hex string, use it directly
        if (typeof value === 'string' && value.startsWith('0x')) {
            return Utils.formatEther(value)
        }

        // If it's a number in scientific notation, convert to BigInt first
        if (typeof value === 'string' && value.includes('e')) {
            return Utils.formatEther(BigInt(parseFloat(value)).toString())
        }

        // For other cases, convert to string
        return Utils.formatEther(value.toString())
    } catch (error) {
        console.error('Error formatting ether:', error, 'Value:', value)
        return '0'
    }

}

export async function getBalance(address: string) {
    try {
        const balance = await alchemySDK.core.getBalance(address)
        return Utils.formatEther(balance)
    } catch (error) {
        console.error("Error fetching balance:", error)
        return "0"
    }
}

export async function getHistoricalTransfers(address: string, startBlock: string = "0x0", endBlock: string = "latest", order: SortingOrder = SortingOrder.DESCENDING) {

    try {
        if (!address) {
            throw new Error("Address is required for fetching historical transfers")
        }

        // Fetch asset transfers for the given address
        const transfers = await alchemySDK.core.getAssetTransfers({
            fromBlock: startBlock,
            toBlock: endBlock,
            fromAddress: address,
            excludeZeroValue: true,
            category: [AssetTransfersCategory.ERC20, AssetTransfersCategory.ERC721],
            maxCount: 250,
            order: order,
        })

        return transfers.transfers
    } catch (error) {
        console.error("Error fetching historical transfers:", error)
        return []
    }
}



export default alchemySDK