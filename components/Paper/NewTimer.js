import React, { useState, useEffect } from "react";


export default function NewTimer({ time, startTime }) {

    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        // time is in seconds convert that to hours mins and seconds
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor((time % 3600) % 60);
        
        // set time formatted and padded
        setTimeLeft(
            `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );

    }, [time]);

    return (
        <div className="flex flex-col justify-center text-lg">
            <div>
                Start Time:
                {" " + startTime}
            </div>
            <div>Time Left:{" " + timeLeft}</div>
        </div>
    );
}
