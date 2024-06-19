import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InstitutewiseTT = () => {
  const location = useLocation();
  //   const [schema, setSchema] = useState({
  //     course_name: "",
  //     course_code: "",
  //     year_code: 0,
  //     master_code: "",
  //   });
  const [institute, setInstitute] = useState({ name: "", code: null });
  const [examdays, setExamDays] = useState([]);
  const [timetableM, setTimetableM] = useState([]);
  const [timetableA, setTimetableA] = useState([]);
  const [groupedtimetableM, setGroupedTimetableM] = useState([]);
  const [groupedtimetableA, setGroupedTimetableA] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    axios
      .get("http://localhost:3001/institutewise/institutes")
      .then((response) => {
        setInstitute({
          code: code,
          name: [...response.data].filter((data) => {
            return data.inst_id === code;
          })[0].inst_name,
        });
      })
      .catch((error) => console.error("Error fetching institutes:", error));
  }, [location.search]);

  useEffect(() => {
    async function getTimetableData() {
      try {
        const response = await axios.get(
          `http://localhost:3001/institutewise/examdays`
        );
        setExamDays(response.data);
      } catch (error) {
        console.error("Error fetching Examdays:", error);
      }
    }
    getTimetableData();
  }, [location.search]);

  useEffect(() => {
    async function fetchTimetable() {
      try {
        const timetablePromisesM = examdays.map((d) =>
          axios.get(
            `http://localhost:3001/institutewise/timetable/${institute.code}/${d.exam_dayw}/M`
          )
        );
        const responsesM = await Promise.all(timetablePromisesM);
        const timetableDataM = responsesM.map((response) => response.data);
        setTimetableM(timetableDataM);

        const timetablePromisesA = examdays.map((d) =>
          axios.get(
            `http://localhost:3001/institutewise/timetable/${institute.code}/${d.exam_dayw}/A`
          )
        );

        const responsesA = await Promise.all(timetablePromisesA);
        const timetableDataA = responsesA.map((response) => response.data);
        setTimetableA(timetableDataA);
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    }

    fetchTimetable();
  }, [examdays, institute]);

  useEffect(() => {
    function groupAndAddSchemaKey(examData) {
      // Create a map to group by the common keys
      let results = [];
      examData.forEach((data) => {
        const groupedData = {};
        data.forEach((item) => {
          const key = `${item.exam_dayw}-${item.date}-${item.paper_code}-${item.daysession}`;

          if (!groupedData[key]) {
            // Initialize the group if it doesn't exist
            groupedData[key] = {
              exam_dayw: item.exam_dayw,
              date: item.date,
              paper_code: item.paper_code,
              daysession: item.daysession,
              subject_name: item.subject_name,
              duration: item.duration,
              paper_time: item.paper_time,
              schema: [],
            };
          }

          // Add the schema to the group
          groupedData[key].schema.push(
            `${item.course_code}-${item.year_code}-${item.master_code}`
          );
        });

        // Convert the grouped data from an object back to an array
        const result = Object.values(groupedData).map((group) => {
          group.schema = group.schema.join(", ");
          return group;
        });

        results.push(result);
      });
      return results;
    }
    const groupedExamDataM = groupAndAddSchemaKey(timetableM);
    const groupedExamDataA = groupAndAddSchemaKey(timetableA);
    console.log(groupedExamDataM);
    console.log(groupedExamDataA, "A");
    setGroupedTimetableM(groupedExamDataM);
    setGroupedTimetableA(groupedExamDataA);
  }, [timetableM, timetableA]);

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
        Institute-Wise Time Table for Summer 2024 Theory Examination
      </h2>

      <table className="table table-bordered" width="100%">
        <tbody>
          <tr>
            <th colSpan="4" style={{ color: "#506a9e", textAlign: "center" }}>
              {`${institute.name}`}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => navigate("/")}
              >
                Click here to go Back
              </button>
            </th>
          </tr>
          {groupedtimetableM.length > 0 ? (
            groupedtimetableM.map((table, i) => {
              if (table[0] !== undefined) {
                return (
                  <>
                    <tr>
                      <th
                        colSpan="4"
                        style={{ color: "#800000", textAlign: "center" }}
                      >
                        Date: {table[0].date}{" "}
                        {table[0].daysession === "A" ? "Afternoon" : "Morning"}{" "}
                        Day:
                        {table[0].exam_dayw}
                      </th>
                    </tr>
                    <tr>
                      <th style={headingStyle}>Time Slot</th>
                      <th style={headingStyle}>Subject Code</th>
                      <th style={headingStyle}>Subject Name</th>
                      <th style={headingStyle}>Schema</th>
                    </tr>
                    {table.map((data, i) => {
                      return (
                        <tr>
                          <th>{data.paper_time}</th>
                          <th>{data.paper_code}</th>
                          <th>{data.subject_name}</th>
                          <th>{data.schema}</th>
                        </tr>
                      );
                    })}
                  </>
                );
              } else {
                return "";
              }
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
          {groupedtimetableA.length > 0 ? (
            groupedtimetableA.map((table, i) => {
              if (table[0] !== undefined) {
                return (
                  <>
                    <tr>
                      <th
                        colSpan="4"
                        style={{ color: "#800000", textAlign: "center" }}
                      >
                        Date: {table[0].date}{" "}
                        {table[0].daysession === "A" ? "Afternoon" : "Morning"}{" "}
                        Day:
                        {table[0].exam_dayw}
                      </th>
                    </tr>
                    <tr>
                      <th style={headingStyle}>Time Slot</th>
                      <th style={headingStyle}>Subject Code</th>
                      <th style={headingStyle}>Subject Name</th>
                      <th style={headingStyle}>Schema</th>
                    </tr>
                    {table.map((data, i) => {
                      return (
                        <tr>
                          <th>{data.paper_time}</th>
                          <th>{data.paper_code}</th>
                          <th>{data.subject_name}</th>
                          <th>{data.schema}</th>
                        </tr>
                      );
                    })}
                  </>
                );
              } else {
                return "";
              }
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

export default InstitutewiseTT;
