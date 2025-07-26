import { BrowserRouter, Routes, Route } from "react-router"
import Layout from "./components/MainLayout"
import LatestBlocks from "./pages/Blocks/LatestBlocks"
import AccountBalance from "./pages/AccountInformation/AccountBalance"
import BlockDetails from "./pages/Blocks/BlockDetails"
import Transactions from "./pages/Blocks/Transactions"
import TransactionDetail from "./pages/Blocks/TransactionDetail"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="blocks" element={<LatestBlocks />} />
                    <Route
                        path="blocks/block/:blockNumber"
                        element={<BlockDetails />}
                    />
                    <Route
                        path="blocks/block/:blockNumber/txs"
                        element={<Transactions />}
                    />
                    <Route
                        path="blocks/block/:blockNumber/txs/:txHash"
                        element={<TransactionDetail />}
                    />
                    <Route
                        path="account-balance"
                        element={<AccountBalance />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
