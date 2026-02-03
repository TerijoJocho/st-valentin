import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    
    function getToday() {
        // return new Date().toISOString().split("T")[0];
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, "0");
        const d = String(now.getDate()).padStart(2, "0");
        return `${d}-${m}-${y}`;
    }
    
    const currDate = getToday();

    return (
        <header>
            <h1 className="header-title">À toi mon amour</h1>
            <div className="date-container">
                <FontAwesomeIcon 
                    icon={faCalendarDays}
                    className="calendar-icon"
                />
                <p>{currDate}</p>
            </div>
        </header>
    )
}