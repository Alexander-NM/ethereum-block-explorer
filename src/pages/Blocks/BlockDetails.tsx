import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getBlock } from "../../utils/alchemy"
import { BlocksDetailsTable } from "../../components/UI/Tables/BlockDetailsTable"
import type { BlockProperties } from "../../types/app.types"
import type { Block } from "alchemy-sdk"

type FormatedBlock = Omit<
    Partial<Block>,
    "timestamp" | "transactions" | "gasLimit" | "gasUsed"
> & {
    timestamp: string
    transactions: number
    gasLimit: string
    gasUsed: string
}

export default function BlockDetails() {
    const { blockNumber } = useParams<{ blockNumber: string }>()
    const [blockProperties, setBlockProperties] = useState<BlockProperties[]>(
        []
    )

    useEffect(() => {
        const convertBlockToProperties = (block: Block): BlockProperties[] => {
            // Convert block properties to the format expected by the table
            const formattedBlock: FormatedBlock = JSON.parse(
                JSON.stringify(block)
            )
            formattedBlock.timestamp = new Date(
                block.timestamp * 1000
            ).toLocaleString()
            formattedBlock.gasLimit = parseInt(
                block.gasLimit._hex,
                16
            ).toLocaleString()
            formattedBlock.gasUsed = parseInt(
                block.gasUsed._hex,
                16
            ).toLocaleString()
            formattedBlock.transactions = block.transactions.length
            delete formattedBlock.nonce
            delete formattedBlock.difficulty
            delete formattedBlock.extraData
            delete formattedBlock.baseFeePerGas
            delete formattedBlock._difficulty

            return Object.entries(formattedBlock).map(([property, value]) => ({
                property: camelCaseToRegularText(property),
                value,
                key: property,
            }))
        }
        const fetchBlock = async () => {
            const block = await getBlock(Number(blockNumber))
            console.log("Fetched block:", block)
            if (block) {
                setBlockProperties(convertBlockToProperties(block))
            }
        }

        fetchBlock()
    }, [blockNumber, setBlockProperties])

    const camelCaseToRegularText = (camelCaseString: string) => {
        // Add a space before each uppercase letter that is preceded by a lowercase letter
        const withSpaces = camelCaseString.replace(/([a-z])([A-Z])/g, "$1 $2")

        // Capitalize the first letter of the entire string
        const capitalizedFirst =
            withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)

        return capitalizedFirst
    }

    if (!blockProperties.length) {
        return <p>Loading block details...</p>
    }
    return (
        <>
            <h2>Block #{blockNumber}</h2>
            {blockProperties.length === 0 ? (
                <p>Loading block properties...</p>
            ) : (
                <BlocksDetailsTable data={blockProperties} blockNumber={blockNumber} />
            )}
        </>
    )
}
