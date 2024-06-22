import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ParamsContext } from "../../contexts/paramsContextProvider";
import { Button } from "@mui/material";

const CodewiseTT = () => {
  const location = useLocation();
  const { selectedPapercode, setSelectedPapercode } = useContext(ParamsContext);
  const [papercode, setPapercode] = useState("");
  const [examdayw, setExamdayw] = useState(0);
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const papercode = selectedPapercode;
    setPapercode(papercode);
  }, [location.search]);

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
          groupedData[key].schema.push(`${item.Course_Year_Master_Code}`);
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

    async function getTableData() {
      const examdayw = await axios
        .get(`http://localhost:3001/papercodewise/examday/${papercode}`)
        .then((response) => response.data[0].exam_dayw);
      setExamdayw(examdayw);
      let timetableArr = [];
      await axios
        .get(
          `http://localhost:3001/papercodewise/alltimetable/${examdayw}/${papercode}`
        )
        .then((response) => timetableArr.push(response.data));
      console.log(timetableArr);
      const groupedData = groupAndAddSchemaKey(timetableArr);
      console.log(groupedData);
      setTimetable(groupedData);
    }
    papercode && getTableData();
  }, [papercode]);

  console.log(examdayw, "checking");
  const navigate = useNavigate();
  const headingStyle = { backgroundColor: "#cad9f1", color: "#506a9e" };
  const schemaStyle = {
    backgroundColor: "#cad9f1",
    color: "#506a9e",
    width: "30%",
  };
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
        Day-Wise Time Table for Summer 2024 Theory Examination
      </h2>

      <table className="table table-bordered" width="100%">
        <tbody>
          <tr>
            <th colSpan="5" style={{ color: "#506a9e", textAlign: "center" }}>
              {`Papercode:${papercode}`}
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
              if (table[0] !== undefined) {
                return (
                  <>
                    <tr>
                      <th
                        colSpan="5"
                        style={{ color: "#800000", textAlign: "center" }}
                      >
                        Date: {table[0].date}{" "}
                        {table[0].daysession === "A" ? "Afternoon" : "Morning"}{" "}
                        Day:
                        {table[0].exam_dayw}
                      </th>
                    </tr>
                    <tr>
                      <th style={headingStyle}>Sr No.</th>
                      <th style={headingStyle}>Time Slot</th>
                      <th style={headingStyle}>Subject Code</th>
                      <th style={headingStyle}>Subject Name</th>
                      <th style={schemaStyle}>Schema</th>
                    </tr>
                    {table.map((data, i) => {
                      return (
                        <tr>
                          <th>{i + 1}</th>
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

export default CodewiseTT;
