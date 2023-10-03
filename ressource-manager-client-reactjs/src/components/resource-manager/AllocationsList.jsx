import React, { useState, useEffect } from "react";
import Allocation from "./Allocation";
import ResourceManagerService from "../../api/services/ResourceManagerService/ResourceMangerService";
import PersonManagerService from "../../api/services/AccountManagerService/PersonManagerService";
import DepartementService from "../../api/services/AccountManagerService/DepartementService";
import AllocationService from "../../api/services/ResourceManagerService/AllocationService";

const AllocationsList = () => {
  const [allocations, setAllocations] = useState([]);
  const [resources, setResources] = useState([]);
  const [persons, setPersons] = useState([]);
  const [departements, setDepartements] = useState([]);

  const [resource, setResource] = useState(null);
  const [person, setPerson] = useState(null);
  const [departement, setDepartement] = useState(null);
  const [allocation, setAllocation] = useState({});

  const [departementName, setDepartementName] = useState(null);

  const [selectedPerson, setSelectedPerson] = useState("person");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [isAllocated, setIsAllocated] = useState(1);

  useEffect(() => {
    console.log("useEffect");

    AllocationService.getAllocations()
      .then((response) => {
        setAllocations(response.data);
      })
      .catch((error) => {});

    ResourceManagerService.getAllResources()
      .then((response) => {
        setResources(
          response.data.filter((resource) => resource.reserve === false)
        );
      })
      .catch((error) => {});

    PersonManagerService.getAllPersons()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {});

    DepartementService.getAllDepartements()
      .then((response) => {
        setDepartements(response.data);
      })
      .catch((error) => {});
  }, [isAllocated]);

  const handlePopUp = (e) => {
    e.preventDefault();

    const popUp = document.querySelector(".allocate-popup");

    window.setTimeout(() => {
      popUp.classList.toggle("fade-in");
    }, 100);

    popUp.classList.toggle("hide");
  };

  const handleAllocationFormCancel = (e) => {
    e.preventDefault();

    const popUp = document.querySelector(".abstract-popup");

    window.setTimeout(() => {
      popUp.classList.toggle("fade-in");
    }, 100);

    popUp.classList.toggle("hide");
  };

  const handleDepartementFormDisplay = (e) => {
    e.preventDefault();

    const popUp = document.querySelector(".departement-popup");

    window.setTimeout(() => {
      popUp.classList.toggle("fade-in");
    }, 100);

    popUp.classList.toggle("hide");
  };

  const handleDepartementFormCancel = (e) => {
    e.preventDefault();

    const popUp = document.querySelector(".departement-popup");

    window.setTimeout(() => {
      popUp.classList.toggle("fade-in");
    }, 100);

    popUp.classList.toggle("hide");
  };

  const handleCheckboxChange = (e) => {
    setSelectedPerson(e.target.value);
  };

  const handleDepartement = async (e) => {
    e.preventDefault();

    await DepartementService.createDepartement(departementName)

      .then((response) => {
        setDepartements([...departements, response.data]);
      })
      .catch((error) => {
        setErrors({
          ...errors,
          departement: "Network error , please try again later",
        });
      });
  };

  const handleAllocation = async (e) => {
    e.preventDefault();

    setLoading(true);

    let resourceId = resource;
    let personId = null;
    let departementId = null;

    if (selectedPerson === "person") {
      personId = person;
      departementId = null;

      allocation.personelAffect = await PersonManagerService.getPerson(personId)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          setErrors({
            ...errors,
            person: "Network error , please try again later",
          });
        });
    } else {
      personId = null;
      departementId = departement;

      allocation.personelAffect = await DepartementService.getDepartementById(
        departementId
      )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          setErrors({
            ...errors,
            departement: "Network error , please try again later",
          });
        });
    }

    allocation.ressource = await ResourceManagerService.getResource(resourceId)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        setErrors({
          ...errors,
          resource: "Network error , please try again later",
        });
      });

    allocation.ressource.reserve = true;
    await ResourceManagerService.updateResource(allocation.ressource);

    if (selectedPerson === "person") {
      await AllocationService.createAllocationForPerson(allocation)
        .then((response) => {
          window.setTimeout(() => {
            setAllocations([...allocations, response.data]);
          }, 1500);
        })
        .catch((error) => {
          setErrors({
            ...errors,
            allocation: "Network error , please try again later",
          });
        });
    } else {
      await AllocationService.createAllocationForDepartement(allocation)
        .then((response) => {
          window.setTimeout(() => {
            setAllocations([...allocations, response.data]);
          }, 1500);
        })
        .catch((error) => {
          setErrors({
            ...errors,
            allocation: "Network error , please try again later",
          });
        });
    }

    setIsAllocated(isAllocated + 1);

    window.setTimeout(() => {
      // hide the popup
      const popUp = document.querySelector(".allocate-popup");

      window.setTimeout(() => {
        popUp.classList.toggle("fade-in");
      }, 100);

      popUp.classList.toggle("hide");

      setLoading(false);
    }, 1500);
  };

  const handleDeallocation = async (allocationId) => {
    const confirm = window.confirm(
      "Are you sure you want to deallocate this resource ?"
    );

    if (!confirm) {
      return;
    }

    let ressource = null;

    setLoading(true);

    await AllocationService.getAllocation(allocationId)
      .then((response) => {
        ressource = response.data.ressource;
      })
      .catch((error) => {
        setErrors({
          ...errors,
          allocation: "Network error , please try again later",
        });
      });

    ressource.reserve = false;
    await ResourceManagerService.updateResource(ressource);

    window.setTimeout(() => {
      AllocationService.deleteAllocation(allocationId)
        .then((response) => {
          setAllocations(
            allocations.filter((allocation) => allocation.id !== allocationId)
          );
        })
        .catch((error) => {
          setErrors({
            ...errors,
            allocation: "Network error , please try again later",
          });
        });
    }, 1500);

    setIsAllocated(isAllocated - 1);

    window.setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="abstract-popup allocate-popup hide">
        <div className="form-head">New Allocation</div>
        <div className="flex-dir-col">
          <div className="form-row">
            <label>Choose a person or departement</label>
            <div className="radio-choose">
              <div className="radio-container">
                person
                <input
                  name="radio"
                  value="person"
                  checked={selectedPerson === "person"}
                  onChange={handleCheckboxChange}
                  type="radio"
                />
                <span className="checkmark"></span>
              </div>
              <div className="radio-container">
                departement
                <input
                  name="radio"
                  value="departement"
                  checked={selectedPerson === "departement"}
                  onChange={handleCheckboxChange}
                  type="radio"
                />
                <span className="checkmark"></span>
              </div>
            </div>
          </div>
          <div
            className={
              selectedPerson === "person"
                ? "form-row person-select"
                : "form-row person-select hide"
            }
          >
            <label>Persons</label>
            <select
              type="text"
              className="sys-form-input"
              onChange={(e) => {
                setPerson(e.target.value);
              }}
            >
              <option>Select Person</option>
              {persons.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.nom + " " + p.prenom}
                </option>
              ))}
            </select>
          </div>
          <div
            className={
              selectedPerson === "departement"
                ? "form-row departement-select"
                : "form-row departement-select hide"
            }
          >
            <label>Departements</label>
            <div className="flex-center">
              <select
                type="text"
                className="sys-form-input"
                onChange={(e) => {
                  setDepartement(e.target.value);
                }}
              >
                <option>Select Departement</option>
                {departements.map((d) => (
                  <option value={d.id} key={d.id}>
                    {d.nomDepartement}
                  </option>
                ))}
              </select>
              <button
                onClick={handleDepartementFormDisplay}
                className="add-item-button"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="form-row">
            <label>Resources</label>
            <select
              type="text"
              className="sys-form-input"
              onChange={(e) => {
                setResource(e.target.value);
              }}
            >
              <option>Select Resource</option>
              {resources.map((r) => (
                <option value={r.id} key={r.id}>
                  {r.type + " - " + r.marque}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>Allocation Date</label>
            <input
              type="date"
              className="sys-form-input"
              onChange={(e) =>
                setAllocation({
                  ...allocation,
                  date_affectation: e.target.value,
                })
              }
            />
          </div>
          <br />
          <div className="form-row">
            <div className="flex-center">
              <input
                type="submit"
                onClick={handleAllocation}
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
      <div className="abstract-popup departement-popup hide">
        <div className="form-head">New Departement</div>
        <div className="flex-dir-col">
          <div className="form-row">
            <label>Departement Name</label>
            <input
              type="text"
              className="sys-form-input"
              onChange={(e) => {
                setDepartementName({ nomDepartement: e.target.value });
              }}
            />
          </div>
          <div className="form-row">
            <div className="flex-center">
              <button
                onClick={handleDepartement}
                className="sys-form-btn sys-btn-primary add-item-btn add"
              >
                Add Departement
              </button>
              <button
                onClick={handleDepartementFormCancel}
                className="sys-form-btn sys-btn-primary add-item-btn cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="current-title">
        Resource Manager Dashboard \ Allocations
      </div>
      <br />
      <div className="tool-bar flex-center justify-space-between">
        <div className="table-title">All Allocations</div>
        <div className="tool-link">
          <div onClick={handlePopUp} className="btn btn-tool tool-create">
            New Allocation
          </div>
        </div>
      </div>
      <br />
      <div className="table resources-table">
        <div className="table-head flex-center">
          <div className="block">type</div>
          <div className="block">owner</div>
          <div className="block">date</div>
          <div className="block flex-center">
            <div className="block">allocate</div>
          </div>
        </div>
        {allocations.map((allocation, index) => (
          <Allocation
            key={index}
            allocation={allocation}
            loading={loading}
            handleDeallocation={handleDeallocation}
          />
        ))}
      </div>
    </>
  );
};

export default AllocationsList;
