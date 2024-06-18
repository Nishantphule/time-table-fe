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

  useEffect(() => {
    // Access query parameters
    const searchParams = new URLSearchParams(location.search);

    async function getTimetableData() {
      const name = searchParams.get("institute");
      const code = searchParams.get("code");
      setInstitute({ name, code });

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
  console.log(examdays[0]);
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
        console.log(timetableDataM);

        const timetablePromisesA = examdays.map((d) =>
          axios.get(
            `http://localhost:3001/institutewise/timetable/${institute.code}/${d.exam_dayw}/A`
          )
        );

        const responsesA = await Promise.all(timetablePromisesA);
        const timetableDataA = responsesA.map((response) => response.data);
        setTimetableA(timetableDataA);
        console.log(timetableDataA);
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    }

    fetchTimetable();
  }, [examdays, institute]);

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
        </tbody>
      </table>
    </div>
  );
};

export default InstitutewiseTT;
