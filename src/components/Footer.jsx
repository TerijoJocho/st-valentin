import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopyright } from "@fortawesome/free-solid-svg-icons"
import "./Footer.css"

export default function Footer() {
    return (
        <footer>
            <p className="footer-title">Daryl</p>
            <FontAwesomeIcon icon={faCopyright} />
        </footer>
    )
}