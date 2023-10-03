import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AllocationReportService from "../../api/services/BrickDownService/AllocationReportService";
import ReportTechnicalService from "../../api/services/BrickDownService/ReportTechnicalService";

import AccountManagerService from "../../api/services/AccountManagerService/AccountManagerService";

import Breakdown from "./Breakdown";
import useAuth from "../../hooks/useAuth"

const BreakdownsList = () => {
  const { state } = useLocation();    
  const {auth} = useAuth();
  
  const [breakdowns, setBreakdowns] = useState([]);
  const [reportDetails, setReportDetails] = useState([]);

  const [breakdown, setBreakdown] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    AllocationReportService.getAllBreakdowns()
    .then((response) => {
      setBreakdowns(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [loading,setLoading]);

  const handleReportDetails = async (e, breakdown) => {

    let user = auth.user;

    setLoading(true);

    let accountData = await AccountManagerService.getAccount(user)
    .then((response) => {
      return response.data;
    })
    .catch(error => console.log("error !"));

    let technician = accountData.m_Personne;

    reportDetails.panne = breakdown;
    reportDetails.technicien = technician;

    console.log(reportDetails);

    ReportTechnicalService.createReport(reportDetails);

    setLoading(false);
  };

  const handlePopUp = (e, breakdown) => {
    setBreakdown(breakdown);

    e.preventDefault();

    console.log(breakdown);

    const popUp = document.querySelector(".send-report-popup");

    window.setTimeout(() => {
      popUp.classList.toggle("fade-in");
    }, 100);

    popUp.classList.toggle("hide");
  };

  const handleAllocationFormCancel = (e) => {
    e.preventDefault();

    const popUp = document.querySelector(".abstract-popup");

    window.setTimeout(() => {
      popUp.classList.toggle("fade-in");
    }, 100);

    popUp.classList.toggle("hide");
  };

  const handleFilterDisplay = (e) => {
    e.preventDefault();
    console.log(breakdown);
    alert("filter");
  };

  return (
    <>
      <div className="abstract-popup send-report-popup hide">
        <div className="form-head">Report Details</div>
        <div className="flex-dir-col">
          <div className="form-row">
            <label>Report </label>
            <input
              type="text"
              className="sys-form-input"
              placeholder="Breakdown Description"
              onChange={(e) =>
                setReportDetails({
                  ...reportDetails,
                  constat: e.target.value,
                })
              }
            />
          </div>
          <br />
          <div className="form-row">
            <div className="flex-center">
              <input
                type="submit"
                onClick={(e) => {
                  handleReportDetails(e, breakdown);
                }}
                className={
                  "sys-form-btn sys-btn-primary add-item-btn add" +
                  (loading ? " loading-animation" : "")
                }
                value={loading ? "Sending Report..." : "Send Report"}
              />
              <input
                type="submit"
                onClick={handleAllocationFormCancel}
                className="sys-form-btn sys-btn-primary add-item-btn cancel"
                value={loading ? "Cancelling..." : "Cancel Sending Report"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="current-title">Technical Dashboard \ Breakdowns</div>
      <br />
      <div className="tool-bar flex-center justify-space-between">
        <div className="table-title">All Breakdowns</div>
        <div className="flex-center">
          <div id="filter" className="tool-link" onClick={handleFilterDisplay}>
            <li className="tool-icon flex-center">
              <i className="fab fa-searchengin"></i>
            </li>
          </div>
        </div>
      </div>
      <br />
      {state ? (
        <div className="message success-msg flex-center">{state}</div>
      ) : (
        ""
      )}
      <div className="grid resources-grid">
        {breakdowns.map((breakdown, index) => (
          <Breakdown
            key={index}
            breakdown={breakdown}
            handlePopUp={handlePopUp}
          />
        ))}
      </div>
    </>
  );
};

export default BreakdownsList;
