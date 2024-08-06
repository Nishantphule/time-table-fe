import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import CoursewiseTT from "./Components/Timetables/CoursewiseTT";
import InstitutewiseTT from "./Components/Timetables/InstitutewiseTT";
import DaywiseTT from "./Components/Timetables/DaywiseTT";
import CodewiseTT from "./Components/Timetables/CodewiseTT";
import CenterwiseTT from "./Components/Timetables/CenterwiseTT";
import { Paper } from "@mui/material";

function App() {
  return (
    <Paper elevation={3}>
      <div className="App">
        {/* Header */}
        <div className="header">
          <div className="logo">
            <a href="#" title="Maharashtra State Board of Technical Education">
              {" "}
              MSBTE
            </a>
          </div>
          <div className="clear"></div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coursewise" element={<CoursewiseTT />} />
          <Route path="/institutewise" element={<InstitutewiseTT />} />
          <Route path="/daywise" element={<DaywiseTT />} />
          <Route path="/papercodewise" element={<CodewiseTT />} />
          <Route path="/centerwise" element={<CenterwiseTT />} />
        </Routes>

        <div className="notebook" style={{ margin: "5px" }}>
          <h2 className="notebook-header">
            Important Instructions for Summer 2024 Exam
          </h2>
          <ul>
            <li>
              <strong style={{ color: "red", fontSize: "14px" }}>
                1. The Exam Day &amp; Date wise Final Time Table for Summer 2024
                Theory Examination is displayed on MSBTE portal for the
                information of students, institutes and all concerned.
              </strong>
            </li>
            <li>
              <strong
                style={{ color: "blue", fontWeight: "bold", fontSize: "14px" }}
              >
                2. The duration of the Summer 2024 Theory Examination is 18
                days. The Examinations are scheduled for all days excluding
                Sundays, Public Holidays and the considering dates of Loksabha
                Elections 2024 in the State of Maharashtra.
              </strong>
            </li>
            <strong
              style={{ color: "blue", fontWeight: "bold", fontSize: "14px" }}
            />
            <li>
              <span
                style={{ color: "blue", fontWeight: "bold", fontSize: "14px" }}
              >
                3. All students belonging to old schemes shall note that the
                theory examination shall be as per the paper codes which are
                offered as equivalent to the courses in old schemes &amp;
                indicated on their hall ticket.
              </span>
            </li>
            <li>
              <span
                style={{ color: "blue", fontWeight: "bold", fontSize: "14px" }}
              >
                4. Examination of different semesters /year scheduled on the
                same day but in different time slots shall not be considered as
                a clash.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Paper>
  );
}

export default App;
