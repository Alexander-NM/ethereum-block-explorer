import { Link, NavLink } from "react-router"

export default function Header() {

    return (
        <header>
            <Link className="site-logo" to="blocks">
                #Ethereum Blocks
            </Link>
            <nav>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                    to="blocks"
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                    to="account"
                >
                    Account details
                </NavLink>
            </nav>
        </header>
    )
}
