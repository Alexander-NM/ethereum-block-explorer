import { Link, NavLink } from "react-router"

export default function Header() {

    return (
        <header>
            <Link className="site-logo" to=".">
                #Ethereum Blocks
            </Link>
            <nav>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                    to="."
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                    to="/account-balance"
                >
                    Account Balance
                </NavLink>
            </nav>
        </header>
    )
}
