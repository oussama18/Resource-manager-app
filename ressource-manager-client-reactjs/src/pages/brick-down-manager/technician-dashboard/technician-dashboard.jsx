import { Routes, Route } from "react-router-dom";

import BrickDownManagerNavBar from "../../../components/brick-down-manager/BrickDownManagerNavBar";

import BreakdownsList from "../../../components/brick-down-manager/BreakdownsList";
import TechnicalReprtsList from "../../../components/brick-down-manager/TechnicalReportsList"
import MaintenanceSideBar from "../../../components/brick-down-manager/MaintenanceSideBar";

const TechnicianDashboard = () => {
  return (
    <div className="content">

      <main className="main-resource-dashboard">
        <MaintenanceSideBar />
        <div className="flex-center">
          <BrickDownManagerNavBar />
        </div>
        <div className="container pd-t-1">
          <div className="main-content">
            <Routes>
              <Route path="/breakdowns" element={<BreakdownsList />} />
              <Route path="/reports" element={<TechnicalReprtsList />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TechnicianDashboard;
