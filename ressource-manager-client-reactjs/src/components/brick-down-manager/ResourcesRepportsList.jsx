import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import AllocationService from "../../api/services/ResourceManagerService/AllocationService";
import AllocationReportService from "../../api/services/BrickDownService/AllocationReportService";
import PersonManagerService from "../../api/services/AccountManagerService/PersonManagerService";
import ResourceManagerService from "../../api/services/ResourceManagerService/ResourceMangerService";

import ResourceRepport from "./ResourceRepport";
import useAuth from "../../hooks/useAuth"

const ResourcesRepportsList = () => {
  const { state } = useLocation();
  const {auth} = useAuth();
  const [resources, setResources] = useState([]);

  const [allocation, setAllocation] = useState([]);
  const [allocationReport, setAllocationReport] = useState([]);
  
  const [departementName, setDepartementName] = useState(null);

  const [selectedPerson, setSelectedPerson] = useState("person");
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleReport = async (e,allocation) => {
    e.preventDefault();

    setLoading(true);

    let personId = allocation.personelAffect.id
    let resourceId = allocation.ressource.id

    allocationReport.person = await PersonManagerService.getPerson(personId)
    .then((response) => {
      return response.data;
    })
    .catch(error => {
      alert("error !")
    });
    
    allocationReport.ressource  = await ResourceManagerService.getResource(resourceId)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        setErrors({
          ...errors,
          resource: "Network error , please try again later",
        });
      });

    AllocationReportService.createAllocationReport(allocationReport);

    window.setTimeout(() => {

      const popUp = document.querySelector(".report-popup");

      window.setTimeout(() => {
        popUp.classList.toggle("fade-in");
      }, 100);

      popUp.classList.toggle("hide");

      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    AllocationService.getAllocationsByUser(auth.user)
      .then((response) => {
        setResources(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[auth,loading]);

  const handlePopUp = (e,allocation) => {

    setLoading(true);

    setAllocation(allocation);

    let def_sys = document.querySelector(".Defaut_Systeme");
    let def_sys_1 = document.querySelector(".Defaut_Logiciel_Utilitaire");

    if(allocation.ressource.type !== "ordinateur")
    {
      def_sys.classList.add("hide");
      def_sys_1.classList.add("hide");

    }else{
      def_sys.classList.remove("hide");
      def_sys_1.classList.remove("hide");
    }

    e.preventDefault();

    const popUp = document.querySelector(".report-popup");

    window.setTimeout(() => {
      popUp.classList.toggle("fade-in");
    }, 100);

    popUp.classList.toggle("hide");

    setLoading(false);
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
    console.log(resources);
    alert("filter")
  };

  return (
    <>
     <div className="abstract-popup report-popup hide">
        <div className="form-head">Report Break Down</div>
        <div className="flex-dir-col">
          <div className="form-row order-select">
            <label>Break Dwon Order</label>
            <select
              type="text"
              className="sys-form-input"
              onChange={(e) =>
                setAllocationReport({
                  ...allocationReport,
                  orderPanne: e.target.value,
                })
              }
            >
              <option>Select Order</option>
              <option class="Defaut_Systeme" value="Defaut_Systeme">Defaut Systeme</option>
              <option value="Defaut_Materiel">Defaut Materiel</option>
              <option class="Defaut_Logiciel_Utilitaire"  value="Defaut_Logiciel_Utilitaire">Defaut Logiciel_Utilitaire</option>
            </select>
          </div>
          <div className="form-row Frequency-select">
            <label>Break Down Frequence </label>
            <div className="flex-center">
              <select
                type="text"
                className="sys-form-input"
                onChange={(e) =>
                  setAllocationReport({
                    ...allocationReport,
                    frequence: e.target.value,
                  })
                }
              >
                <option>Select frequence</option>
                <option value="rare">rare</option>
                <option value="frequente">frequente</option>
                <option value="permanente">permanente</option>
        
        
              </select>
            </div>
          </div>
         
          <div className="form-row">
            <label>Break Down Date</label>
            <input
              type="date"
              className="sys-form-input"
              onChange={(e) =>
                setAllocationReport({
                  ...allocationReport,
                  date_Apparition: e.target.value,
                })
              }
            />
          </div>

          <div className="form-row">
            <label>Explication</label>
            <input
              type="text"
              className="sys-form-input"
              onChange={(e) =>
                setAllocationReport({
                  ...allocationReport,
                  explication: e.target.value,
                })
              }
            />
          </div>

          <br />
          <div className="form-row">
            <div className="flex-center">
              <input
                type="submit"
                onClick={(e) => { handleReport(e,allocation) }}
                className={
                  "sys-form-btn sys-btn-primary add-item-btn add" +
                  (loading ? " loading-animation" : "")
                }
                value={loading ? "Allocating Resource..." : "Allocate Resource"}
              />
              <input
                type="submit"
                onClick={handleAllocationFormCancel}
                className="sys-form-btn sys-btn-primary add-item-btn cancel"
                value={loading ? "Cancelling..." : "Cancel Allocation"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="current-title">
        Teacher Dashboard \ My Allocations
      </div>
      <br />
      <div className="tool-bar flex-center justify-space-between">
        <div className="table-title">All My Allocations</div>
        <div className="flex-center">
          <div id="filter" className="tool-link" onClick={handleFilterDisplay}>
            <li className="tool-icon flex-center"><i className="fab fa-searchengin"></i></li>
          </div>
        </div>
      </div>
      <br />
	    { state ? <div className="message success-msg flex-center">{state}</div> : ""}
      <div className="grid resources-grid">
        {resources.map((resource, index) => (
          <ResourceRepport
          key={index}
          resource={resource}
          handlePopUp={handlePopUp}
          />
          ))}
      </div>
    </>
  );
};

export default ResourcesRepportsList;
