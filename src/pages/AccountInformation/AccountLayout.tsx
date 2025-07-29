import { Input, message } from "antd"
import type { GetProps } from "antd"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router"
import { isValidETHAddress } from "../../utils/utils"

type SearchProps = GetProps<typeof Input.Search>
const { Search } = Input

export default function AccountDetails() {
    const [searchAddress, setSearchAddress] = useState<string>("")
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()

    const onSearch: SearchProps["onSearch"] = (value, _, info) => {
        if (info?.source === "clear") return
        if (!value) {
            messageApi.error("Please enter an address")
            return
        }

        if (!isValidETHAddress(value)) {
            messageApi.error("Invalid Ethereum address")
            return
        }
        navigate(`/account/${value}`)
        setSearchAddress("")
    }
    return (
        <>
            {contextHolder}
            <Search
                className="search-address"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                placeholder="0xe23ffe3b7d4c931..."
                onSearch={onSearch}
                allowClear
                maxLength={42}
                // onEnter={onSearch}
            />

            <Outlet />
        </>
    )
}
