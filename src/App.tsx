import { BrowserRouter, Routes, Route } from "react-router"
import Layout from "./components/MainLayout"
import LatestBlocks from "./pages/Blocks/LatestBlocks"
import AccountDetails from "./pages/AccountInformation/AccountDetails"
import BlockDetails from "./pages/Blocks/BlockDetails"
import Transactions from "./pages/Blocks/Transactions"
import TransactionDetail from "./pages/Blocks/TransactionDetails"
import AccountLayout from "./pages/AccountInformation/AccountLayout"
import NotFound from "./pages/NotFound"

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
                        path="blocks/block/:blockNumber/txns/:txnHash"
                        element={<TransactionDetail />}
                    />
                    <Route path="account" element={<AccountLayout />}>
                        <Route path=":address" element={<AccountDetails />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
