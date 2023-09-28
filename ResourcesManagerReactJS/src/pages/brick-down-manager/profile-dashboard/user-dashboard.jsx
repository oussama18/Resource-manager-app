import { Routes, Route, Link } from "react-router-dom";

import BrickDownManagerNavBar from "../../../components/brick-down-manager/BrickDownManagerNavBar";
import BrickDownSideBar from "../../../components/brick-down-manager/BrickDownSideBar";

const UserDashboard = () => {
  return (
    <div className="content">

      <main className="main-resource-dashboard">
        <BrickDownSideBar />
        <div className="flex-center">
          <BrickDownManagerNavBar />
        </div>
        <div className="container pd-t-1">
          <div className="main-content">
            <Routes>

            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
