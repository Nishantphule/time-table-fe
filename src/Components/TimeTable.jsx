import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const TimeTable = () => {
    const location = useLocation();
    const [filter, setFilter] = useState("")
    const [day,setDays] = useState([]);

    useEffect(() => {
        // Access query parameters
        const searchParams = new URLSearchParams(location.search);
        const filter = searchParams.get('filter');
        setFilter(filter)
        if(filter === "Coursewise"){
            const course_code = searchParams.get("coursecode")
            const year_code = searchParams.get("yearsemester")
            const master_code = searchParams.get("mastercode")

            axios.get(`http://localhost:3001/coursewise/dayquery/${course_code}/${year_code}/${master_code}`)
            .then(response => setDays(response.data))
            .catch(error => console.error('Error fetching master codes:', error));

            console.log(day);
        }
    }, [location]);

    return (
        <div>
            {filter === "Examcenter" ? <h2 style={{ padding: "5px 0px", textAlign: "center", fontSize: "14px", fontWeight: "bold" }}>Exam Center-Wise Time Table for Summer 2024 Theory Examination</h2> : filter}
        </div>
    )
}

export default TimeTable