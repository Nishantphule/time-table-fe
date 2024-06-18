import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DayWise = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState([
    "All",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
  ]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const [error, setError] = useState("");

  // useEffect(() => {
  //     // Fetch days from the backend
  //     axios.get('https://api.example.com/days')
  //         .then(response => setDays(response.data))
  //         .catch(error => console.error('Error fetching days:', error));
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDay || !selectedSlot) {
      setError("Please select a value from both dropdowns.");
    } else {
      setError("");
      // Handle form submission logic here
      navigate(
        `/timetable?filter=Daywise&day=${selectedDay}&slot=${selectedSlot}`
      );
      console.log("Form submitted with:", {
        selectedDay,
        selectedSlot,
      });
    }
  };

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="form_box" style={{ border: "5px solid #9ddde3" }}>
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
                      className="select"
                    >
                      <option value="">--Select--</option>
                      {days.map((day, i) => (
                        <option
                          style={{ fontSize: "14px" }}
                          key={i}
                          value={day}
                        >
                          {day}
                        </option>
                      ))}
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
                      className="select"
                    >
                      <option value="">--Select--</option>
                      <option style={{ fontSize: "14px" }} value="all">
                        All
                      </option>
                      <option style={{ fontSize: "14px" }} value="morning">
                        Morning
                      </option>
                      <option style={{ fontSize: "14px" }} value="afternoon">
                        Afternoon
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    <button type="submit" className="button">
                      Time Table
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DayWise;
