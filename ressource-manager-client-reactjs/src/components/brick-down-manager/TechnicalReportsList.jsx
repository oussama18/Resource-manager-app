import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import ReportTechnicalService from "../../api/services/BrickDownService/ReportTechnicalService";
import TechnicalReport from "../../components/brick-down-manager/TechnicalReport";

import useAuth from "../../hooks/useAuth";

const TechnicalReportsList = () => {
  const { state } = useLocation();
  const { auth } = useAuth();

  const [reports, setReports] = useState([]);

  const [breakdown, setBreakdown] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {

    ReportTechnicalService.getAllReports()
      .then((response) => {
        setReports(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [loading,setLoading]);

  const handleBreakFix = (e,reportId) => {

    setLoading(true);

    ReportTechnicalService.fixResourceBreakdown(reportId);

    setLoading(false);
  };

  const handleChangeResource = (e,reportId) => {

    setLoading(true);
    
    ReportTechnicalService.changeBreakedResource(reportId);

    setLoading(false);
  };

  const handleSendMail = (e,reportId) => {

    setLoading(true);

    ReportTechnicalService.sendMailToManufacturer(reportId);

    setLoading(false);
  }

  const handleFilterDisplay = (e) => {
    e.preventDefault();
    console.log(breakdown);
    alert("filter");
  };

  return (
    <>
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
        {reports.map((report, index) => (
          <TechnicalReport
            key={index}
            report={report}
            handleBreakFix={handleBreakFix}
            handleChangeResource={handleChangeResource}
            handleSendMail={handleSendMail}
          />
        ))}
      </div>
    </>
  );
};

export default TechnicalReportsList;
