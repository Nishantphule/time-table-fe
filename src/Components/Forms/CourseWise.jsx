import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseWise = () => {

    const [courseCodes, setCourseCodes] = useState([1, 2, 3, 4]);
    const [allYearSemesters, setAllYearSemesters] = useState([{ years: [1, 2, 3, 4], courseCode: 1 }]);
    const [allMasterCodes, setAllMasterCodes] = useState([]);

    const [filteredYearSemesters, setFilteredYearSemesters] = useState([]);
    const [filteredMasterCodes, setFilteredMasterCodes] = useState([]);

    const [selectedCourseCode, setSelectedCourseCode] = useState('');
    const [selectedYearSemester, setSelectedYearSemester] = useState('');
    const [selectedMasterCode, setSelectedMasterCode] = useState('');

    const [error, setError] = useState('');

    // useEffect(() => {
    //     // Fetch all data from the backend when the component mounts
    //     axios.get('https://api.example.com/course-codes')
    //         .then(response => setCourseCodes(response.data))
    //         .catch(error => console.error('Error fetching course codes:', error));

    //     axios.get('https://api.example.com/year-semesters')
    //         .then(response => setAllYearSemesters(response.data))
    //         .catch(error => console.error('Error fetching year/semesters:', error));

    //     axios.get('https://api.example.com/master-codes')
    //         .then(response => setAllMasterCodes(response.data))
    //         .catch(error => console.error('Error fetching master codes:', error));
    // }, []);

    useEffect(() => {
        // Filter year/semesters based on selected course code
        if (selectedCourseCode) {
            setFilteredYearSemesters(allYearSemesters.filter(item => item.courseCode === selectedCourseCode));
            console.log(filteredYearSemesters)
        } else {
            setFilteredYearSemesters([]);
            setSelectedYearSemester('');
            setFilteredMasterCodes([]);
            setSelectedMasterCode('');
        }
    }, [selectedCourseCode, allYearSemesters]);

    useEffect(() => {
        // Filter master codes based on selected course code and year/semester
        if (selectedCourseCode && selectedYearSemester) {
            setFilteredMasterCodes(allMasterCodes.filter(item =>
                item.courseCode === selectedCourseCode && item.yearSemester === selectedYearSemester));
        } else {
            setFilteredMasterCodes([]);
            setSelectedMasterCode('');
        }
    }, [selectedCourseCode, selectedYearSemester, allMasterCodes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedCourseCode || !selectedYearSemester || !selectedMasterCode) {
            setError('Please select a value from all dropdowns.');
        } else {
            setError('');
            // Handle form submission logic here
            console.log('Form submitted with:', {
                selectedCourseCode,
                selectedYearSemester,
                selectedMasterCode,
            });
        }
    };

    return (
        <div className='col-12 col-md-6 col-lg-4'>
            <div className="form_box" style={{ border: "5px solid #b0a9ea" }}>
                <div className="form_title" style={{ background: "#d0cdeb", color: "#555086" }}>
                    MSBTE Course-wise Summer 2024
                    <span style={{ color: "red" }}>
                        {" "}FINAL{" "}
                    </span>
                    Time Table for Theory Examination
                </div>
                <div className='p-2'>
                    <form onSubmit={handleSubmit} className="form-table">
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td className="label-cell">
                                        <label htmlFor="course-code-select" className="label">Course Code:</label>
                                    </td>
                                    <td>
                                        <select
                                            id="course-code-select"
                                            name="courseCodes"
                                            value={selectedCourseCode}
                                            onChange={(e) => setSelectedCourseCode(e.target.value)}
                                            className="select"
                                        >
                                            <option value="">--Select--</option>
                                            {courseCodes.map((course, i) => (
                                                <option key={i} value={course.id}>
                                                    {course}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label-cell">
                                        <label htmlFor="year-semester-select" className="label">Year/Semester:</label>
                                    </td>
                                    <td>
                                        <select
                                            id="year-semester-select"
                                            name="yearSemesters"
                                            value={selectedYearSemester}
                                            onChange={(e) => setSelectedYearSemester(e.target.value)}
                                            className="select"
                                            disabled={!selectedCourseCode}
                                        >
                                            <option value="">--Select--</option>
                                            {filteredYearSemesters.map((yearSemester, i) => (
                                                <option key={i} value={yearSemester}>
                                                    {yearSemester}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label-cell">
                                        <label htmlFor="master-code-select" className="label">Master Code:</label>
                                    </td>
                                    <td>
                                        <select
                                            id="master-code-select"
                                            name="masterCodes"
                                            value={selectedMasterCode}
                                            onChange={(e) => setSelectedMasterCode(e.target.value)}
                                            className="select"
                                            disabled={!selectedCourseCode || !selectedYearSemester}
                                        >
                                            <option value="">--Select--</option>
                                            {filteredMasterCodes.map((masterCode, i) => (
                                                <option key={i} value={masterCode}>
                                                    {masterCode}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'center' }}>
                                        <button type="submit" className="button">Time Table</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    </form>
                </div>
            </div>
        </div >
    )
}

export default CourseWise