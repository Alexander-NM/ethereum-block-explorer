import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import LatestBlocks from "./pages/LatestBlocks";
import AccountBalance from "./pages/AccountBalance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LatestBlocks />} />
          <Route path="account-balance" element={<AccountBalance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
