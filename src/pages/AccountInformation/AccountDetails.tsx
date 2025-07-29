import { useEffect, useState } from "react"
import {  useParams } from "react-router"
import { getBalance, getHistoricalTransfers } from "../../utils/alchemy"
import type { AccountTransactions } from "../../types/app.types"
import { AccountHistoryTable } from "../../components/UI/Tables/AccountHistoryTable"
import { CryptoPrice } from '@ant-design/web3'


export default function AccountDetails() {
    const [balance, setBalance] = useState<string>("")
    const [historicalTransfers, setHistoricalTransfers] = useState<
        AccountTransactions[]
    >([])
    const { address } = useParams<{ address: string }>();

    useEffect(() => {
        async function fetchBalance() {
            if (!address) return
            const balance = await getBalance(address)
            setBalance(balance)

            const historicalTransfers = await getHistoricalTransfers(address)
            setHistoricalTransfers(
                historicalTransfers.map((transfer) => ({
                    asset: transfer.asset,
                    blockNum: transfer.blockNum,
                    from: transfer.from,
                    to: transfer.to,
                    category: transfer.category,
                    value: transfer.value,
                    key: transfer.hash,
                }))
            )
        }
        fetchBalance()
    }, [address])

     const getBalanceInWei = (ethBalance: string): bigint => {
        try {
            // Remove " ETH" suffix if present and convert to wei
            const ethValue = parseFloat(ethBalance.replace(' ETH', ''))
            const weiValue = ethValue * Math.pow(10, 18)
            return BigInt(Math.floor(weiValue))
        } catch {
            return BigInt(0)
        }
    }

    return (
        <>
            
            <div className="address">
                <span className="font-bold">Address:</span> {address}
            </div>
            <div className="balance">
                <span className="font-bold">Balance:</span>
                <CryptoPrice  className="crypto-price" icon value={getBalanceInWei(balance)} />
            </div>
            <AccountHistoryTable  data={historicalTransfers}  />
        </>
    )
}
