import { Link,useNavigate } from "react-router-dom";
import AuthenticationService from "../../auth/services/auth-service";

import "../../ui/NavBars.css";

const ResourceManagerNavbar = () => {

  // const navigate = useNavigate();

  const handleDepartementFormDisplay = (e) => {
    e.preventDefault();

    const popUp = document.querySelector(".user-drop-down");

    window.setTimeout(() => {
      popUp.classList.toggle("fade-in");
    }, 100);

    popUp.classList.toggle("hide");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    AuthenticationService.logout();
    window.location = "/login";
    // navigate('/login',{replace:true});
  };

  return (
    <div className="rm-nav-bar flex-center fixed">
      <div className="container flex-center justify-space-between">
        <div className="flex-center">
          <li className="link-container">
            <Link className="link" to="/resource-manager/accounts">
              Accounts
            </Link>
          </li>
          <li className="link-container">
            <Link className="link" to="/resource-manager/resources">
              Resources
            </Link>
          </li>
          <li className="link-container">
            <Link className="link" to="/resource-manager/allocations">
              Allocations
            </Link>
          </li>
          <li className="link-container">
            <Link className="link" to="/resource-manager/allocations">
              Help
            </Link>
          </li>
          <li className="link-container">
            <Link className="link" to="/resource-manager/allocations">
              About
            </Link>
          </li>
        </div>
        <div className="flex-center">
          <li className="link-container">
            <div className="link link-icon flex-center">
              <i className="fas fa-home icon"></i>
            </div>
          </li>
          <li className="link-container">
            <div className="link link-icon flex-center">
              <i className="fas fa-bell icon"></i>
            </div>
          </li>
          <li className="link-container">
            <div className="link link-icon flex-center">
              <i className="fas fa-cog icon"></i>
            </div>
          </li>
          <li className="link-container">
            <div className="link link-icon flex-center">
              <i className="fas fa-th icon"></i>
            </div>
          </li>
          <li className="link-container">
            <div className="link link-icon flex-center" onClick={handleDepartementFormDisplay}>
              <i className="fas fa-user icon"></i>
            </div>
            <div className="drop-down user-drop-down hide" id="user-drop-down">
                <div className="flex-center flex-dir-col">
                    <div className="link" onClick={handleLogout}>profile</div>
                    <div className="link" onClick={handleLogout}>logout</div>
                </div>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
};

export default ResourceManagerNavbar;
