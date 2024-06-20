import React, { createContext, useEffect, useState } from "react";

export const ParamsContext = createContext();

export const ParamsProvider = ({ children }) => {
  const [selectedExamCenter, setSelectedExamCenter] = useState(
    localStorage.getItem("selectedExamCenter") || 0
  );

  const [selectedInstituteCode, setSelectedInstituteCode] = useState(
    localStorage.getItem("selectedInstituteCode") || 0
  );

  const [selectedCourseParams, setSelectedCourseParams] = useState(
    JSON.parse(localStorage.getItem("selectedCourseParams")) || {}
  );

  const [selectedDayParams, setSelectedDayParams] = useState(
    JSON.parse(localStorage.getItem("selectedDayParams")) || {}
  );

  const [selectedPapercode, setSelectedPapercode] = useState(
    localStorage.getItem("selectedPapercode") || 0
  );

  useEffect(() => {
    localStorage.setItem("selectedExamCenter", selectedExamCenter);
    localStorage.setItem("selectedInstituteCode", selectedInstituteCode);
    localStorage.setItem(
      "selectedCourseParams",
      JSON.stringify(selectedCourseParams)
    );
    localStorage.setItem(
      "selectedDayParams",
      JSON.stringify(selectedDayParams)
    );
    localStorage.setItem("selectedPapercode", selectedPapercode);
  }, [
    selectedExamCenter,
    selectedInstituteCode,
    selectedCourseParams,
    selectedDayParams,
    selectedPapercode,
  ]);

  return (
    <ParamsContext.Provider
      value={{
        selectedExamCenter,
        setSelectedExamCenter,
        selectedInstituteCode,
        setSelectedInstituteCode,
        selectedCourseParams,
        setSelectedCourseParams,
        selectedDayParams,
        setSelectedDayParams,
        selectedPapercode,
        setSelectedPapercode,
      }}
    >
      {children}
    </ParamsContext.Provider>
  );
};
