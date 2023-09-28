import React,{useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./ui/App.css";

import Home from "./pages/common/home/home";
import ResourcesDashboard from "./pages/resource-manager/resource-dashboard/resource-manager-dashboard";
import LoginPage from "./auth/pages/login/login";
import UserDashboard from "./pages/brick-down-manager/user-dashboard/user-dashboard";
import TechnicianDashboard from "./pages/brick-down-manager/technician-dashboard/technician-dashboard"

import RequireAuth from "./components/common/RequireAuth";
import useAuth from "./hooks/useAuth";
import AuthenticationService from "./auth/services/auth-service";

const ROLES = {
  chefDepartement:"chefDepartement",
  responsableRessources:"responsableRessources",
  enseignant:"enseignant",
  technicien:"technicien"
}

function App() {

  const {auth,setAuth} = useAuth();

  useEffect(() => {
    
    const authData = AuthenticationService.isAuthenticated();

    if(authData.state)
    {
      const tokenData = JSON.parse(authData.currentUserData).access_token;
      
      const authResponseData = JSON.parse(window.atob(tokenData.split('.')[1]));
      
      let user = authResponseData?.sub;
      let accessToken = tokenData;
      let roles = authResponseData?.roles;
      
      setAuth({user,roles,accessToken});
    }

  }, [setAuth]);


  return (
    <Router>
      <div className="App">
    	<Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<RequireAuth allowedRoles={[ROLES.responsableRessources]} />}>
            <Route path="/resource-manager//*" element={<ResourcesDashboard />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.enseignant]} />}>
            <Route path="/dashboard//*" element={<UserDashboard />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.technicien]} />}>
            <Route path="/maintenance//*" element={<TechnicianDashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
