import {data} from '../data' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import "./Heart.css"

export default function Heart() {
    function getToday() {
        // const today = new Date();
        // const year = today.getFullYear();
        // const month = today.getMonth() + 1;
        // const date = today.getDate();
        // return `${year}-${month}-${date}`;
        return new Date().toISOString().split("T")[0];
    }

    const heartContainer = data.map((obj) => {
        let isActive = obj.date <= getToday();

        return (
            <section 
                key={obj.id}
                className={`heart ${isActive ? "active" : "disabled"}`}
            >
                <FontAwesomeIcon icon={faHeart} />
                {isActive && obj.text}
            </section>
        )
    })

    return (
        <>
            {heartContainer}
        </>
    )
}