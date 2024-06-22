import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ParamsContext } from "../../contexts/paramsContextProvider";
import { Button } from "@mui/material";

const CoursewiseTT = () => {
  const location = useLocation();
  const { selectedCourseParams } = useContext(ParamsContext);
  const [schema, setSchema] = useState({
    course_name: "",
    course_code: "",
    year_code: 0,
    master_code: "",
  });
  const [day, setDays] = useState([]);
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    // Access query parameters
    const searchParams = new URLSearchParams(location.search);

    async function getTimetableData() {
      const { course_code, course_name, year_code, master_code } =
        selectedCourseParams;
      setSchema({
        course_name,
        course_code,
        year_code,
        master_code,
      });

      try {
        const response = await axios.get(
          `http://localhost:3001/coursewise/dayquery/${course_code}/${year_code}/${master_code}`
        );
        setDays(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching master codes:", error);
      }
    }
    getTimetableData();
  }, [location.search]);

  useEffect(() => {
    async function fetchTimetable() {
      if (day.length === 0) return;

      try {
        const timetablePromises = day.map((d) =>
          axios.get(
            `http://localhost:3001/coursewise/timetable/${schema.course_code}/${schema.year_code}/${schema.master_code}/${d.exam_dayw}/${d.daysession}`
          )
        );

        const responses = await Promise.all(timetablePromises);
        const timetableData = responses.map((response) => response.data);
        setTimetable(timetableData);
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    }

    fetchTimetable();
  }, [day, schema.course_code, schema.year_code, schema.master_code]);

  const navigate = useNavigate();

  const headingStyle = { backgroundColor: "#cad9f1", color: "#506a9e" };
  return (
    <div>
      <h2
        style={{
          padding: "5px 0px",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        Course-Wise Time Table for Summer 2024 Theory Examination
      </h2>

      <table className="table table-bordered" width="100%">
        <tbody>
          <tr>
            <th colSpan="4" style={{ color: "#506a9e", textAlign: "center" }}>
              {`Course:${schema.course_code}(${schema.course_name})  Year/Semester:${schema.year_code}   Master:${schema.master_code}`}
              <Button
                variant="contained"
                size="small"
                style={{
                  marginLeft: "10px",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/")}
              >
                Click here to go Back
              </Button>
            </th>
          </tr>
          {timetable.length > 0 ? (
            timetable.map((table, i) => {
              return table.map((data) => {
                return (
                  <>
                    <tr>
                      <th
                        colSpan="4"
                        style={{ color: "#800000", textAlign: "center" }}
                      >
                        Date: {data.date}{" "}
                        {data.daysession === "A" ? "Afternoon" : "Morning"} Day:
                        {data.exam_dayw}
                      </th>
                    </tr>
                    <tr>
                      <th style={headingStyle}>Time Slot</th>
                      <th style={headingStyle}>Subject Code</th>
                      <th style={headingStyle}>Subject Name</th>
                      <th style={headingStyle}>Schema</th>
                    </tr>
                    <tr>
                      <th>{data.paper_time}</th>
                      <th>{data.paper_code}</th>
                      <th>{data.subject_name}</th>
                      <th>
                        {schema.course_code} - {schema.year_code} -{" "}
                        {schema.master_code}
                      </th>
                    </tr>
                  </>
                );
              });
            })
          ) : (
            <h2
              style={{
                padding: "5px 0px",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "bold",
                color: "red",
              }}
            >
              No Data to Display
            </h2>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CoursewiseTT;
