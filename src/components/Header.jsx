import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    
    function getToday() {
        return new Date().toISOString().split("T")[0];
    }
    
    const currDate = getToday();

    return (
        <header>
            <h1 className="header-title">Mon Cadeau De St-Valentin Pour Toi</h1>
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