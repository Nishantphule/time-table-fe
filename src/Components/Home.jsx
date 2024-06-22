import React from "react";
import InstituteWise from "./Forms/InstituteWise";
import CourseWise from "./Forms/CourseWise";
import DayWise from "./Forms/DayWise";
import CodeWise from "./Forms/CodeWise";
import CenterWise from "./Forms/CenterWise";

const Home = () => {
  return (
    <div>
      {/* Timetable header */}
      <div className="timetable-header mt-3">
        <span style={{ color: "red" }}>{/* <!--FINAL--> */}</span>
        <span style={{ color: "red" }}>
          {/* <!--TENTATIVE -->
        <!--Exam Day & Date wise Time Table for  for AICTE Diploma engineering & PCI approved Diploma Pharmacy Programmes.--> */}
          Summer 2024 Theory Exam Day &amp; Date wise Final Time Table for
          Diploma in Engineering, Pharmacy and Government Approved Short Term
          (Non-AICTE) courses courses
          {/* <!--for Final Semester/Year students--> */}
        </span>
        <br />
        {/* <!--<span style="color:#800000">(06 October 2020 to 17 October 2020)</span> --> */}
      </div>

      {/* Filter forms */}
      <div className="row mt-3 p-1">
        <InstituteWise />
        <CourseWise />
        <DayWise />
        <CodeWise />
        <CenterWise />
      </div>
    </div>
  );
};

export default Home;
