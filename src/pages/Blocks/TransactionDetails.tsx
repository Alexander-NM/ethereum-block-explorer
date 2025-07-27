import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { TransactionProperties } from "../../types/app.types"
import { formatEther, getTransaction } from "../../utils/alchemy"
import { camelCaseToRegularText } from "../../utils/textUtils"
import type { TransactionResponse } from "alchemy-sdk"
import { TransactionDetailsTable } from "../../components/UI/Tables/TransactionDetailsTable"
import { hexToLocaleString } from "../../utils/numberUtils"

type FormattedTransaction = Omit<
    Partial<TransactionResponse>,
    | "timestamp"
    | "gasPrice"
    | "gasLimit"
    | "maxFeePerGas"
    | "maxPriorityFeePerGas"
    | "value"
> & {
    timestamp: string
    gasLimit: string
    gasPrice: string
    maxFeePerGas: string
    maxPriorityFeePerGas: string
    creates?: string
    transactionIndex?: number
    value: string
}

export default function TransactionDetail() {
    const { txnHash } = useParams<{ txnHash: string }>()
    const [txnProperties, setTxnProperties] = useState<TransactionProperties[]>(
        []
    )

    useEffect(() => {
        const fetchTransaction = async () => {
            if (!txnHash) {
                console.error("Transaction hash is required")
                return
            }
            // Fetch transaction details using the txnHash
            const transaction = await getTransaction(txnHash)
            if (!transaction) {
                console.error("Transaction not found")
                return
            }
            if (transaction) {
                // Convert the transaction to properties and set state
                const properties = convertTransactionToProperties(transaction)
                setTxnProperties(properties)
            }
        }

        const convertTransactionToProperties = (
            transaction: TransactionResponse
        ): TransactionProperties[] => {
            const formattedTransaction: FormattedTransaction = JSON.parse(
                JSON.stringify(transaction)
            )
            if (transaction.timestamp) {
                formattedTransaction.timestamp = new Date(
                    transaction.timestamp * 1000
                ).toLocaleString()
            }
            formattedTransaction.gasLimit = hexToLocaleString(
                transaction.gasLimit._hex
            )
            if (transaction.gasPrice) {
                formattedTransaction.gasPrice = hexToLocaleString(
                    transaction.gasPrice._hex
                )
            }
            if (transaction.maxFeePerGas) {
                formattedTransaction.maxFeePerGas = hexToLocaleString(
                    transaction.maxFeePerGas._hex
                )
            }
            if (transaction.maxPriorityFeePerGas) {
                formattedTransaction.maxPriorityFeePerGas = hexToLocaleString(
                    transaction.maxPriorityFeePerGas._hex
                )
            }
            if (transaction.value) {
                formattedTransaction.value =
                    formatEther(
                        parseInt(transaction.value._hex, 16).toString()
                    ) + " ETH"
            }
            delete formattedTransaction.accessList
            delete formattedTransaction.blockHash
            delete formattedTransaction.chainId
            delete formattedTransaction.data
            delete formattedTransaction.r
            delete formattedTransaction.s
            delete formattedTransaction.v
            delete formattedTransaction.wait
            delete formattedTransaction.creates
            delete formattedTransaction.type
            delete formattedTransaction.transactionIndex

            // Convert transaction properties to the format expected by the table
            return Object.entries(formattedTransaction).map(
                ([property, value]) => ({
                    property: camelCaseToRegularText(property),
                    value,
                    key: property,
                })
            )
        }
        fetchTransaction()
    }, [txnHash])

    if (!txnProperties.length) {
        return <p>Loading transaction details...</p>
    }
    return (
        <>
            <h2>Transaction details</h2>
            {txnProperties.length === 0 ? (
                <p>Loading transaction properties...</p>
            ) : (
                <TransactionDetailsTable data={txnProperties} />
            )}
        </>
    )
}
