import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ParamsContext } from "../../contexts/paramsContextProvider";
import { Button, Card } from "@mui/material";

const CourseWise = () => {
  const navigate = useNavigate();
  const { selectedCourseParams, setSelectedCourseParams } =
    useContext(ParamsContext);

  const [courseCodes, setCourseCodes] = useState([]);
  const [allYearSemesters, setAllYearSemesters] = useState([]);
  const [allMasterCodes, setAllMasterCodes] = useState([]);

  // const [filteredYearSemesters, setFilteredYearSemesters] = useState([]);
  // const [filteredMasterCodes, setFilteredMasterCodes] = useState([]);

  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [selectedYearSemester, setSelectedYearSemester] = useState("");
  const [selectedMasterCode, setSelectedMasterCode] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all data from the backend when the component mounts
    axios
      .get("http://localhost:3001/coursewise/coursecode")
      .then((response) =>
        setCourseCodes(
          [...response.data].map((data) => {
            return { code: data.course_code, name: data.course_name };
          })
        )
      )
      .catch((error) => console.error("Error fetching course codes:", error));
  }, []);

  useEffect(() => {
    // Filter year/semesters based on selected course code
    if (selectedCourseCode) {
      axios
        .get(`http://localhost:3001/coursewise/yearcode/${selectedCourseCode}`)
        .then((response) => setAllYearSemesters(response.data))
        .catch((error) =>
          console.error("Error fetching year/semesters:", error)
        );
    } else {
      setSelectedYearSemester("");
      setSelectedMasterCode("");
    }
  }, [selectedCourseCode, allYearSemesters]);

  useEffect(() => {
    // Filter master codes based on selected course code and year/semester
    if (selectedCourseCode && selectedYearSemester) {
      axios
        .get(
          `http://localhost:3001/coursewise/mastercode/${selectedCourseCode}/${selectedYearSemester}`
        )
        .then((response) => setAllMasterCodes(response.data))
        .catch((error) => console.error("Error fetching master codes:", error));
    } else {
      setSelectedMasterCode("");
    }
  }, [selectedCourseCode, selectedYearSemester]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCourseCode || !selectedYearSemester || !selectedMasterCode) {
      setError("Please select a value from all dropdowns.");
    } else {
      setError("");
      // Handle form submission logic here
      const name = [...courseCodes].filter(
        (course) => course.code === selectedCourseCode
      );
      setSelectedCourseParams({
        course_code: selectedCourseCode,
        year_code: selectedYearSemester,
        master_code: selectedMasterCode,
        course_name: name[0].name,
      });
      navigate(`/coursewise`);
      console.log("Form submitted with:", {
        selectedCourseParams,
      });
    }
  };
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Card className="form_box" style={{ border: "5px solid #b0a9ea" }}>
        <div
          className="form_title"
          style={{ background: "#d0cdeb", color: "#555086" }}
        >
          MSBTE Course-wise Summer 2024
          <span style={{ color: "red" }}> FINAL </span>
          Time Table for Theory Examination
        </div>
        <div className="p-2">
          <form onSubmit={handleSubmit} className="form-table">
            <table className="table">
              <tbody>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="course-code-select" className="label">
                      Course Code:
                    </label>
                  </td>
                  <td>
                    <select
                      id="course-code-select"
                      name="courseCodes"
                      value={selectedCourseCode}
                      onChange={(e) => {
                        setSelectedCourseCode(e.target.value);
                      }}
                      className="form-select"
                    >
                      <option value="">--Select--</option>
                      {courseCodes.length ? (
                        courseCodes.map((course, i) => {
                          if (course.code !== "--") {
                            return (
                              <option
                                style={{ fontSize: "14px" }}
                                key={i}
                                value={course.code}
                              >
                                {course.code} - {course.name}
                              </option>
                            );
                          } else {
                            return "";
                          }
                        })
                      ) : (
                        <option value="" disabled>
                          Loading...
                        </option>
                      )}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="year-semester-select" className="label">
                      Year/Semester:
                    </label>
                  </td>
                  <td>
                    <select
                      id="year-semester-select"
                      name="yearSemesters"
                      value={selectedYearSemester}
                      onChange={(e) => setSelectedYearSemester(e.target.value)}
                      className="form-select"
                      disabled={!selectedCourseCode}
                    >
                      <option value="">--Select--</option>
                      {allYearSemesters.map((yearSemester, i) => (
                        <option
                          style={{ fontSize: "14px" }}
                          key={i}
                          value={yearSemester.year_code}
                        >
                          {yearSemester.year_code}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="master-code-select" className="label">
                      Master Code:
                    </label>
                  </td>
                  <td>
                    <select
                      id="master-code-select"
                      name="masterCodes"
                      value={selectedMasterCode}
                      onChange={(e) => setSelectedMasterCode(e.target.value)}
                      className="form-select"
                      disabled={!selectedYearSemester}
                    >
                      <option value="">--Select--</option>
                      {allMasterCodes.map((data, i) => (
                        <option key={i} value={data.master_code}>
                          {data.master_code}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      size="small"
                      type="submit"
                      className="button"
                    >
                      Course-wise TimeTable
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

export default CourseWise;
