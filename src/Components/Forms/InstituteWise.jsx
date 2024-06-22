import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ParamsContext } from "../../contexts/paramsContextProvider";
import { Button, Card } from "@mui/material";

const InstituteWise = () => {
  const navigate = useNavigate();
  const [institutes, setInstitutes] = useState({});
  const [codes, setCodes] = useState([]);
  const { setSelectedInstituteCode } = useContext(ParamsContext);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the data from the backend and set the state
    // Replace these URLs with your actual backend endpoints
    axios
      .get("http://localhost:3001/institutewise/institutes")
      .then((response) => {
        setInstitutes(
          [...response.data].map((data) => {
            return {
              name: data.inst_name,
              region: data.dte_region,
              code: data.inst_id,
            };
          })
        );
      })
      .catch((error) => console.error("Error fetching institutes:", error));

    axios
      .get("http://localhost:3001/institutewise/institutes")
      .then((response) =>
        setCodes([...response.data].map((data) => data.inst_id))
      )
      .catch((error) => console.error("Error fetching codes:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedInstitute && !selectedCode) {
      setError("Please select at least one value from either dropdown.");
    } else if (selectedInstitute && selectedCode) {
      setError("Please select only one value from either dropdown.");
    } else {
      setError("");

      // Handle form submission logic here
      if (selectedCode) {
        setSelectedInstituteCode(selectedCode);
        navigate(`/institutewise`);
      } else {
        setSelectedInstituteCode(selectedInstitute);
        navigate(`/institutewise`);
      }

      console.log("Form submitted with:", {
        selectedInstitute,
        selectedCode,
      });
    }
  };

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Card className="form_box" style={{ border: "5px solid #a3bbe7" }}>
        <div
          className="form_title"
          style={{ background: "#c1d3f3", color: "#325492" }}
        >
          MSBTE Institute-wise Summer 2024
          <span style={{ color: "red" }}> FINAL </span>
          Time Table for Theory Examination
        </div>
        <div className="p-2">
          <form onSubmit={handleSubmit} className="form-table">
            <table className="table">
              <tbody>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="institute-select" className="label">
                      Select Institute:
                    </label>
                  </td>
                  <td>
                    <select
                      id="institute-select"
                      name="institutes"
                      value={selectedInstitute}
                      onChange={(e) => setSelectedInstitute(e.target.value)}
                      className="form-select"
                    >
                      <option value="">--Select--</option>
                      {institutes.length ? (
                        <>
                          <option
                            value=""
                            disabled
                            style={{
                              color: "green",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            ----- Mumbai Region -----
                          </option>
                          {institutes.map((institute, i) => {
                            if (institute.region === "Mumbai") {
                              return (
                                <option
                                  style={{ fontSize: "14px" }}
                                  key={i}
                                  value={institute.code}
                                >
                                  {institute.name}
                                </option>
                              );
                            } else {
                              return "";
                            }
                          })}
                          <option value="" disabled></option>
                          <option
                            value=""
                            disabled
                            style={{
                              color: "green",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            ----- Pune Region -----
                          </option>
                          {institutes.map((institute, i) => {
                            if (institute.region === "Pune") {
                              return (
                                <option
                                  style={{ fontSize: "14px" }}
                                  key={i}
                                  value={institute.code}
                                >
                                  {institute.name}
                                </option>
                              );
                            } else {
                              return "";
                            }
                          })}
                          <option value="" disabled></option>
                          <option
                            value=""
                            disabled
                            style={{
                              color: "green",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            ----- Nagpur Region -----
                          </option>
                          {institutes.map((institute, i) => {
                            if (institute.region === "Nagpur") {
                              return (
                                <option
                                  style={{ fontSize: "14px" }}
                                  key={i}
                                  value={institute.code}
                                >
                                  {institute.name}
                                </option>
                              );
                            } else {
                              return "";
                            }
                          })}
                          <option value="" disabled></option>
                          <option
                            value=""
                            disabled
                            style={{
                              color: "green",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            ----- Chhatrapati Sambhaji Nagar Region -----
                          </option>
                          {institutes.map((institute, i) => {
                            if (
                              institute.region === "Chhatrapati Sambhaji Nagar"
                            ) {
                              return (
                                <option
                                  style={{ fontSize: "14px" }}
                                  key={i}
                                  value={institute.code}
                                >
                                  {institute.name}
                                </option>
                              );
                            } else {
                              return "";
                            }
                          })}
                        </>
                      ) : (
                        <option value="" disabled>
                          Loading...
                        </option>
                      )}
                    </select>
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td colSpan="2">OR</td>
                </tr>
                <tr>
                  <td className="label-cell">
                    <label htmlFor="code-select" className="label">
                      Institute Code:
                    </label>
                  </td>
                  <td>
                    <select
                      id="code-select"
                      name="codes"
                      value={selectedCode}
                      onChange={(e) => setSelectedCode(e.target.value)}
                      className="form-select"
                    >
                      <option value="">--Select--</option>
                      {codes.length ? (
                        codes.map((code, i) => (
                          <option key={i} value={code}>
                            {code}
                          </option>
                        ))
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
                      Institute-wise TimeTable
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

export default InstituteWise;
