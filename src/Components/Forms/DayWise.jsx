import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ParamsContext } from "../../contexts/paramsContextProvider";
import { Button, Card } from "@mui/material";

const DayWise = () => {
  const navigate = useNavigate();
  const { selectedDayParams, setSelectedDayParams } = useContext(ParamsContext);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch days from the backend
    axios
      .get("http://localhost:3001/daywise/examdays")
      .then((response) => setDays(response.data))
      .catch((error) => console.error("Error fetching days:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDay || !selectedSlot) {
      setError("Please select a value from both dropdowns.");
    } else {
      setError("");
      // Handle form submission logic here
      setSelectedDayParams({ day: selectedDay, slot: selectedSlot });
      navigate(`/daywise`);
      console.log("Form submitted with:", {
        selectedDayParams,
      });
    }
  };

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Card className="form_box" style={{ border: "5px solid #9ddde3" }}>
        <div
          className="form_title"
          style={{ background: "#c7eaed", color: "#105c62" }}
        >
          MSBTE Day-wise Summer 2024
          <span style={{ color: "red" }}> FINAL </span>
          Time Table for Theory Examination
        </div>
        <div className="p-2">
          <form onSubmit={handleSubmit} className="form-table">
            <table className="table">
              <tbody>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="day-select" className="label">
                      Day:
                    </label>
                  </td>
                  <td>
                    <select
                      id="day-select"
                      name="days"
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(e.target.value)}
                      className="form-select"
                    >
                      <option value="">--Select--</option>
                      {days.length ? (
                        <>
                          <option value="all" style={{ fontSize: "14px" }}>
                            All
                          </option>

                          {days.map((day, i) => (
                            <option
                              style={{ fontSize: "14px" }}
                              key={i}
                              value={day.exam_dayw}
                            >
                              {day.exam_dayw}
                            </option>
                          ))}
                        </>
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
                    <label htmlFor="slot-select" className="label">
                      Slot:
                    </label>
                  </td>
                  <td>
                    <select
                      id="slot-select"
                      name="slots"
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="form-select"
                    >
                      <option value="">--Select--</option>

                      {days.length ? (
                        <>
                          <option style={{ fontSize: "14px" }} value="all">
                            All
                          </option>
                          <option style={{ fontSize: "14px" }} value="M">
                            Morning
                          </option>
                          <option style={{ fontSize: "14px" }} value="A">
                            Afternoon
                          </option>
                        </>
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
                    <Button
                      variant="contained"
                      size="small"
                      type="submit"
                      className="button"
                    >
                      Day-wise TimeTable
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

export default DayWise;
