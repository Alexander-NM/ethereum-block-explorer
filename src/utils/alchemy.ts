import { Alchemy, Network } from "alchemy-sdk"

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY
const settings = {
        apiKey: ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
    }

const alchemySDK = new Alchemy(settings)
export default alchemySDK