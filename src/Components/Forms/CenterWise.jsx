import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ParamsContext } from "../../contexts/paramsContextProvider";
import { Button, Card } from "@mui/material";

const CenterWise = () => {
  const navigate = useNavigate();
  const [examCenters, setExamCenters] = useState([]);
  const { setSelectedExamCenter, selectedExamCenter } =
    useContext(ParamsContext);
  const [center, setCenter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch exam centers from the backend
    axios
      .get("http://localhost:3001/examcenterwise/examcenter")
      .then((response) => {
        setExamCenters(response.data);
      })
      .catch((error) => console.error("Error fetching exam centers:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!center) {
      setError("Please select an exam center.");
    } else {
      setError("");
      // Proceed with form submission logic here
      setSelectedExamCenter(center);
      navigate(`/centerwise`);
      console.log("Form submitted with exam center:", selectedExamCenter);
    }
  };
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Card className="form_box" style={{ border: "5px solid #95d37c" }}>
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
                      value={center}
                      onChange={(e) => setCenter(e.target.value)}
                      className="form-select"
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
                  <td
                    colSpan="2"
                    style={{ textAlign: "center" }}
                    className="button"
                  >
                    <Button variant="contained" size="small" type="submit">
                      Examcenter-wise TimeTable
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CenterWise;
