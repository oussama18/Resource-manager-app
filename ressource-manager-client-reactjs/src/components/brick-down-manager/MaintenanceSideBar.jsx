import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const MaintenanceSideBar = () => {
  const {auth} = useAuth();
  const [selected, setSelected] = useState("breakdowns");

  const handleSelectedLink = (e) => {

    let target = e.target;
    let parent = target.parentElement;

    setSelected(parent.id);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-head flex-center">
        <div>{auth.user}</div>
      </div>
      <div className="sidebar-content">
        <div className="flex-center flex-dir-col">
          <li
            id="profile"
            className={
              selected === "profile"
                ? "link-container flex-center selected"
                : "link-container flex-center"
            }
          >
            <i className="fas fa-user icons"></i>
            <Link
              className="link"
              to="/maintenance/profile"
              onClick={handleSelectedLink}
            >
              Profile
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
            <i className="fas fa-laptop icons"></i>
            <Link
              className="link"
              to="/maintenance/reports"
              onClick={handleSelectedLink}
            >
              Reports
            </Link>
          </li>
          <li
            id="breakdowns"
            className={
              selected === "breakdowns"
                ? "link-container flex-center selected"
                : "link-container flex-center"
            }
          >
            <i className="fas fa-calendar-alt icons"></i>
            <Link
              className="link"
              to="/maintenance/breakdowns"
              onClick={handleSelectedLink}
            >
              Breakdowns
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
              to="/maintenance/help"
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
              to="/maintenance/about"
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

export default MaintenanceSideBar;
