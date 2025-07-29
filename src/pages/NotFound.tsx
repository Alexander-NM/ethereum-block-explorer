import { Link } from "react-router"

export default function NotFound() {
    return (
        <div className="message-404-container">
            <h1>Sorry, the page you were looking for was not found</h1>
            <Link to="/blocks">Return to home</Link>
        </div>
    )
}
