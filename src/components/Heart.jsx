import {data} from '../data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import './Heart.css';

export default function Heart() {
    function getLocalDate() {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, "0");
        const d = String(now.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    }

    const today = getLocalDate();
    const LAST_DAY_KEY = "last-open-day";
    const [openedHearts, setOpenedHearts] = useState({});

    //reset le localStorage au rafraichissement de la page
    //à zero chaque nouveau jour
    // useEffect(() => {
    //     const lastDay = localStorage.getItem(LAST_DAY_KEY);

    //     if (today !== lastDay)
    //     {
    //         Object.keys(localStorage).forEach(key => {
    //             if (key.startsWith("heart-"))
    //                 localStorage.removeItem(key);
    //         });
    //         localStorage.setItem(LAST_DAY_KEY, today);
    //         setOpenedHearts({});
    //     }
    // }, []);

    //reset le localStorage a zero dès 00h
    useEffect(() => {
        function msUntilMidnight() {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0);
            return midnight - now;
        }

        const timeout = setTimeout(() => {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith("heart-"))
                    localStorage.removeItem(key);
            });
            localStorage.setItem(LAST_DAY_KEY, today);
            setOpenedHearts({});
        }, msUntilMidnight());

        return () => clearTimeout(timeout); //fn de cleanUp
    }, []);

    //recupere les coeurs ouverts dans localStorage
    useEffect(() => {
        const stored = {};
        data.forEach(obj => {
            const key = `heart-${obj.id}-${today}`;
            if (localStorage.getItem(key)) {
                stored[obj.id] = true;
            }
        });
        setOpenedHearts(stored);
    }, [today]);

    //set le coeur qui peut etre ouvert dans localStorage
    function handleClick(obj) {
        if (obj.date > today) return;

        const key = `heart-${obj.id}-${today}`;
        localStorage.setItem(key, "opened");

        setOpenedHearts(prev => ({
            ...prev,
            [obj.id]: true
        }));
    }

    //render
    return (
        <>
            {data.map(obj => {
                const isActive = obj.date <= today;
                const isOpen = openedHearts[obj.id];

                return (
                    <section key={obj.id} className="heart-block">
                        {!isOpen && (
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={`heart-item ${isActive ? "active" : "disabled"}`}
                                onClick={() => handleClick(obj)}
                                style={{ animationDelay: `${obj.id * 0.4}s` }}
                            />
                        )}

                        {isOpen && (
                            <p className="heart-message fade-in">
                                {obj.text}
                            </p>
                        )}
                    </section>
                );
            })}
        </>
    );
}