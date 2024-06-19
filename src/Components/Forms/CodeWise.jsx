import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CodeWise = () => {
  const navigate = useNavigate();
  const [paperCodes, setPaperCodes] = useState([]);
  const [selectedPaperCode, setSelectedPaperCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch paper codes from the backend
    axios
      .get("http://localhost:3001/papercodewise/papercodes")
      .then((response) => setPaperCodes(response.data))
      .catch((error) => console.error("Error fetching paper codes:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPaperCode) {
      setError("Please select a paper code.");
    } else {
      setError("");
      // Proceed with form submission logic here
      navigate(`/papercodewise?papercode=${selectedPaperCode}`);
      console.log("Form submitted with paper code:", selectedPaperCode);
    }
  };
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="form_box" style={{ border: "5px solid #95d37c" }}>
        <div
          className="form_title"
          style={{ background: "#d7edc7", color: "#2a5e03" }}
        >
          MSBTE Paper Code-wise Summer 2024
          <span style={{ color: "red" }}> FINAL </span>
          Time Table for Theory Examination
        </div>
        <div className="p-2">
          <form onSubmit={handleSubmit}>
            <table className="table">
              <tbody>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="paper-code-select" className="label">
                      Paper Code:
                    </label>
                  </td>
                  <td>
                    <select
                      id="paper-code-select"
                      value={selectedPaperCode}
                      onChange={(e) => setSelectedPaperCode(e.target.value)}
                      className="select"
                    >
                      <option value="">--Select--</option>
                      {paperCodes.map((paperCode, i) => (
                        <option
                          style={{ font: "14px" }}
                          key={i}
                          value={paperCode.paper_code}
                        >
                          {paperCode.paper_code}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    <button type="submit" className="button">
                      Time Table
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CodeWise;
