import React, { useEffect, useState } from 'react'
import axios from "axios"

const InstituteWise = () => {
    const [institutes, setInstitutes] = useState(["Pune university", "Mumbai university"])
    const [codes, setCodes] = useState(["1", "2", "3"])
    const [selectedInstitute, setSelectedInstitute] = useState('');
    const [selectedCode, setSelectedCode] = useState('');
    const [error, setError] = useState('');


    // useEffect(() => {
    //     // Fetch the data from the backend and set the state
    //     // Replace these URLs with your actual backend endpoints
    //     axios.get('https://api.example.com/institutes')
    //         .then(response => setInstitutes(response.data))
    //         .catch(error => console.error('Error fetching institutes:', error));

    //     axios.get('https://api.example.com/codes')
    //         .then(response => setCodes(response.data))
    //         .catch(error => console.error('Error fetching codes:', error));
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedInstitute && !selectedCode) {
            setError('Please select at least one value from either dropdown.');
        } else if (selectedInstitute && selectedCode) {
            setError('Please select only one value from either dropdown.');
        } else {
            setError('');
            // Handle form submission logic here
            console.log('Form submitted with:', {
                selectedInstitute,
                selectedCode,
            });
        }
    };

    return (
        <div className='col-12 col-md-6 col-lg-4'>
            <div className="form_box" style={{ border: "5px solid #a3bbe7" }}>
                <div className="form_title" style={{ background: "#c1d3f3", color: "#325492" }}>
                    MSBTE Institute-wise Summer 2024
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
                                        <label htmlFor="institute-select" className="label">Select Institute:</label>
                                    </td>
                                    <td>
                                        <select
                                            id="institute-select"
                                            name="institutes"
                                            value={selectedInstitute}
                                            onChange={(e) => setSelectedInstitute(e.target.value)}
                                            className="select"
                                        >
                                            <option value="">--Select--</option>
                                            {institutes.map((institute, i) => (
                                                <option key={i} value={institute.id}>
                                                    {institute}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr style={{ textAlign: "center" }}>
                                    <td colSpan="2">
                                        OR
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label-cell">
                                        <label htmlFor="code-select" className="label">Institute Code:</label>
                                    </td>
                                    <td>
                                        <select
                                            id="code-select"
                                            name="codes"
                                            value={selectedCode}
                                            onChange={(e) => setSelectedCode(e.target.value)}
                                            className="select"
                                        >
                                            <option value="">--Select--</option>
                                            {codes.map((code, i) => (
                                                <option key={i} value={code.id}>
                                                    {code}
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

export default InstituteWise