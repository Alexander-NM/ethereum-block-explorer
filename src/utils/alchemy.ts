import { Alchemy, Network, Utils } from "alchemy-sdk"

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

export function formatEther(weiValue: string): string {
    const ethValue = Number(Utils.formatEther(weiValue)).toFixed(8)
    return ethValue === "0.00000000" ? "0" : ethValue
}

export default alchemySDK