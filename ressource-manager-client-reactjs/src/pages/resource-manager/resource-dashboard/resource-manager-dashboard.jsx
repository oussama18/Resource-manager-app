import { Routes, Route, Link } from "react-router-dom";

import "../../../ui/App.css";
import "./resource-manager-dashboard.css";

import ResourceManagerNavbar from "../../../components/resource-manager/ResourcesNavBar";
import ResourcesSideBar from "../../../components/resource-manager/ResourcesSideBar";
import ResourcesList from "../../../components/resource-manager/ResourcesList";
import DemandesList from "../../../components/resource-manager/DemandesList";
import AllocationsList from "../../../components/resource-manager/AllocationsList";
import AccountsList from "../../../components/account-manager/AccountsList";
import TechnicalReportsList from "../../../components/brick-down-manager/TechnicalReportsList";
import CreateResource from "../resource-create/create";
import CreateAccount from "../account/create";
import EditResource from "../resource-create/edit";
import EditAccount from "../account/edit";

const ResourcesDashboard = () => {
  return (
    <div className="content">

      <main className="main-resource-dashboard">
        <ResourcesSideBar />
        <div className="flex-center">
          <ResourceManagerNavbar />
        </div>
        <div className="container pd-t-1">
          <div className="main-content">
            <Routes>
              <Route path="/accounts/" element={<AccountsList />} />
              <Route path="/accounts/create" element={<CreateAccount />} />
              <Route path="/accounts/edit/:id" element={<EditAccount />} />
              <Route path="/resources" element={<ResourcesList />} />
              <Route path="/demandes" element={<DemandesList />} />
              <Route path="/allocations" element={<AllocationsList />} />
              <Route path="/reports" element={<TechnicalReportsList />} />
              <Route path="/resources/create" element={<CreateResource />} />
              <Route path="/resources/edit/:id" element={<EditResource />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourcesDashboard;
