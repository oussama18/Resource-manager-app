import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Resource from "../../components/resource-manager/Resource";
import ResourceManegerService from "../../api/services/ResourceManagerService/ResourceMangerService";
import "../../ui/App.css";

const ResourcesList = () => {
  const { state } = useLocation();
  const [resources, setResources] = useState([]);

  const handleDelete = async (resourceId) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      await ResourceManegerService.deleteResource(resourceId)
        .then((response) => {
          console.log(response);
          setResources(
            resources.filter((resource) => resource.id !== resourceId)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {

    console.log("test");

    ResourceManegerService.getAllResources()
      .then((response) => {
        setResources(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  const handleFilterDisplay = (e) => {

    e.preventDefault();
    alert("hhhh")
  };

  return (
    <>
      <div className="current-title">
        Resource Manager Dashboard \ Resources
      </div>
      <br />
      <div className="tool-bar flex-center justify-space-between">
        <div className="table-title">All Resources</div>
        <div className="flex-center">
          <div id="filter" className="tool-link" onClick={handleFilterDisplay}>
            <li className="tool-icon flex-center"><i className="fab fa-searchengin"></i></li>
          </div>
          <div className="tool-link mg-l-1">
            <Link
              className="btn btn-tool tool-create"
              to="/resource-manager/resources/create"
              >
              New Resource
            </Link>
          </div>
        </div>
      </div>
      <br />
	    { state ? <div className="message success-msg flex-center">{state}</div> : ""}
      <div className="table resources-table">
        <div className="table-head flex-center">
          <div className="block">type</div>
          <div className="block">brand</div>
          <div className="block">date</div>
          <div className="block">status</div>
          <div className="oper flex-center">
            <div className="block">update</div>
          </div>
          <div className="oper flex-center">
            <div className="block">delete</div>
          </div>
        </div>
        {resources.map((resource, index) => (
          <Resource
            key={index}
            resource={resource}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
};

export default ResourcesList;
