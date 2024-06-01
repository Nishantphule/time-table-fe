import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const TimeTable = () => {
    const location = useLocation();
    const [filter, setFilter] = useState("")

    useEffect(() => {
        // Access query parameters
        const searchParams = new URLSearchParams(location.search);
        const examcenter = searchParams.get('examcenter');
        const filter = searchParams.get('filter');
        setFilter(filter)
        console.log('examcenter:', examcenter);
    }, [location]);

    return (
        <div>
            {filter === "Examcenter" ? <h2 style={{ padding: "5px 0px", textAlign: "center", fontSize: "14px", fontWeight: "bold" }}>Exam Center-Wise Time Table for Summer 2024 Theory Examination</h2> : ""}
        </div>
    )
}

export default TimeTable