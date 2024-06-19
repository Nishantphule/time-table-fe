import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CenterWise = () => {
  // const history = useH();
  const navigate = useNavigate();

  const [examCenters, setExamCenters] = useState([]);
  const [selectedExamCenter, setSelectedExamCenter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch exam centers from the backend
    axios
      .get("http://localhost:3001/examcenter")
      .then((response) => setExamCenters(response.data))
      .catch((error) => console.error("Error fetching exam centers:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedExamCenter) {
      setError("Please select an exam center.");
    } else {
      setError("");
      // Proceed with form submission logic here
      navigate(`/centerwise?examcenter=${selectedExamCenter}`);
      console.log("Form submitted with exam center:", selectedExamCenter);
    }
  };
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="form_box" style={{ border: "5px solid #95d37c" }}>
        <div
          className="form_title"
          style={{ background: "#d7edc7", color: "#2a5e03" }}
        >
          MSBTE Exam Center-wise Summer 2024
          <span style={{ color: "red" }}> FINAL </span>
          Time Table for Theory Examination
        </div>
        <div className="p-2">
          <form onSubmit={handleSubmit}>
            <table className="table">
              <tbody>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="exam-center-select" className="label">
                      Exam Center:
                    </label>
                  </td>
                  <td>
                    <select
                      id="exam-center-select"
                      value={selectedExamCenter}
                      onChange={(e) => setSelectedExamCenter(e.target.value)}
                      className="select"
                    >
                      <option value="">--Select--</option>
                      {examCenters.length ? (
                        examCenters.map((examCenter, i) => (
                          <option key={i} value={examCenter.exam_center}>
                            {examCenter.exam_center}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          Loading...
                        </option>
                      )}
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

export default CenterWise;
