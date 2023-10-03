import { useState } from "react";
import { Link } from "react-router-dom";

const ResourcesSideBar = () => {
  const [selected, setSelected] = useState("resources");

  const handleSelectedLink = (e) => {

    let target = e.target;
    let parent = target.parentElement;

    setSelected(parent.id);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-head flex-center">
        <div>Resource - Manager</div>
      </div>
      <div className="sidebar-content">
        <div className="flex-center flex-dir-col">
          <li
            id="accounts"
            className={
              selected === "accounts"
                ? "link-container flex-center selected"
                : "link-container flex-center"
            }
          >
            <i className="fas fa-users icons"></i>
            <Link
              className="link"
              to="/resource-manager/accounts"
              onClick={handleSelectedLink}
            >
              Accounts
            </Link>
          </li>
          <li
            id="resources"
            className={
              selected === "resources"
                ? "link-container flex-center selected"
                : "link-container flex-center"
            }
          >
            <i className="fas fa-desktop icons"></i>
            <Link
              className="link"
              to="/resource-manager/resources"
              onClick={handleSelectedLink}
            >
              Resources
            </Link>
          </li>
          {/* <li className="link-container">
            <Link className="link" to=" /resource-manager/demandes">
            Demandes
            </Link>
          </li> */}
          <li
            id="allocations"
            className={
              selected === "allocations"
                ? "link-container flex-center selected"
                : "link-container flex-center"
            }
          >
            <i className="fas fa-calendar-alt icons"></i>
            <Link
              className="link"
              to="/resource-manager/allocations"
              onClick={handleSelectedLink}
            >
              Allocations
            </Link>
          </li>
          <li
            id="reports"
            className={
              selected === "reports"
                ? "link-container flex-center selected"
                : "link-container flex-center"
            }
          >
            <i className="fas fa-calendar-alt icons"></i>
            <Link
              className="link"
              to="/resource-manager/reports"
              onClick={handleSelectedLink}
            >
              Reports
            </Link>
          </li>
          <li
            id="help"
            className={
              selected === "help"
                ? "link-container flex-center selected"
                : "link-container flex-center"
            }
          >
            <i className="fas fa-question-circle icons"></i>
            <Link
              className="link"
              to="/resource-manager/help"
              onClick={handleSelectedLink}
            >
              Help
            </Link>
          </li>
          <li
            id="about"
            className={
              selected === "about"
                ? "link-container flex-center selected"
                : "link-container flex-center"
            }
          >
            <i className="fas fa-info-circle icons"></i>
            <Link
              className="link"
              to="/resource-manager/about"
              onClick={handleSelectedLink}
            >
              About
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSideBar;
