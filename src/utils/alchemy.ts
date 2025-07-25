import { Alchemy, Network } from "alchemy-sdk"

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

export default alchemySDK