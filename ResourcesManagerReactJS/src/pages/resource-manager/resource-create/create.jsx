import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ResourceManegerService from "../../../api/services/ResourceManagerService/ResourceMangerService";
import ManufacturerService from "../../../api/services/ResourceManagerService/ManufacturerService";

const CreateResource = () => {
  const navigate = useNavigate();

  const [selectedForm, setSelectedForm] = useState("computer-form");
  const [resource, setResource] = useState({});
  const [manufacturer, setManufacturer] = useState({});
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");

  const [formErrors, setFormErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ManufacturerService.getManufacturers()
	.then((res) => {
      setManufacturers(res.data);
    });
  }, []);

  const handleSelectedForm = (e) => {
    let target = e.target;
    let targetId = target.getAttribute("id");

    switch (targetId) {
      case "computer":
        setSelectedForm("computer-form");
        break;
      case "printer":
        setSelectedForm("printer-form");
        break;
      default:
        setSelectedForm("computer-form");
        break;
    }
  };

  const handleManufacturerFormDisplay = (e) => {
    e.preventDefault();

    const popUp = document.querySelector(".abstract-popup");

    window.setTimeout(() => {
      popUp.classList.toggle("fade-in");
    }, 100);

    popUp.classList.toggle("hide");
  };
  
  const handleManufactuererCancel = (e) => {
	e.preventDefault();

	const popUp = document.querySelector(".abstract-popup");

	window.setTimeout(() => {
	  popUp.classList.toggle("fade-in");
	}, 100);

	popUp.classList.toggle("hide");

	setManufacturer({});
  };

  const handleManufactuererCreation = async (e) => {
    e.preventDefault();

    await ManufacturerService.createManufacturer(manufacturer)
	.then((response) => {
      if (response.status === 201) {
        setManufacturer(response.data);
        setManufacturers([ ...manufacturers, response.data ]);
      }
    }).then(() => {
      setManufacturer({});
    }).catch((error) => {
		console.log(error);
	});
	
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (selectedForm === "computer-form") {
      resource.type = "ordinateur";
    } else {
      resource.type = "imprimante";
    }

    let manufacturerId = selectedManufacturer;

    resource.fournisseur = await ManufacturerService.getManufacturer(manufacturerId)
	.then((res) => {
      return res.data;
    });

    await ResourceManegerService.createResource(resource)
      .then((response) => {
        window.setTimeout(() => {
        	navigate("/resource-manager/resources",{state:"Resource Successfully Saved !"});
        }, 1500);
      })
      .catch((error) => {
        setFormErrors(error.response.data);
      });
  };

  return (
    <div className="form create-form">
		<div className="abstract-notify"></div>
      <div className="abstract-popup manufacturer-popup hide">
        <div className="form-head">New Manufacturer</div>
        <div className="flex-dir-col">
          <div className="form-row">
            <label>Manufacturer Address</label>
            <input
              type="text"
              className="sys-form-input"
              placeholder="address"
              onChange={(e) =>
                setManufacturer({ ...manufacturer, adresse: e.target.value })
              }
              required
            />
          </div>
          <div className="form-row">
            <label>Manufacturer Email</label>
            <input
              type="email"
              className="sys-form-input"
              placeholder="email"
              onChange={(e) =>
                setManufacturer({ ...manufacturer, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-row">
            <label>Manufacturer Gerant</label>
            <input
              type="text"
              className="sys-form-input"
              placeholder="gerant"
              onChange={(e) =>
                setManufacturer({ ...manufacturer, gerant: e.target.value })
              }
              required
            />
          </div>
          <div className="form-row">
            <label>Society Name</label>
            <input
              type="text"
              className="sys-form-input"
              placeholder="society name"
              onChange={(e) =>
                setManufacturer({ ...manufacturer, nom_societe: e.target.value })
              }
              required
            />
          </div>
          <br/>
          <div className="form-row">
            <div className="flex-center">
              <button onClick={handleManufactuererCreation} className="sys-form-btn sys-btn-primary add-item-btn add">Add Manufacturer</button>
              <button onClick={handleManufactuererCancel} className="sys-form-btn sys-btn-primary add-item-btn cancel">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <div className="current-title">
        Resource Manager Dashboard \ Resources \ New Resource{" "}
      </div>
      <br />
      {/* <div className="flex"> */}
      <div className="topbar flex">
          <div
            className={
              selectedForm === "computer-form"
                ? "item add-item item-selected"
                : "item add-computer"
            }
            id="computer"
            onClick={handleSelectedForm}
          >
            Computer
          </div>
          <br />
          <div
            className={
              selectedForm === "printer-form"
                ? "item add-item item-selected"
                : "item add-computer"
            }
            id="printer"
            onClick={handleSelectedForm}
          >
            Printer
          </div>
      </div>
        {/* <div> */}
      <div className="form-create-container">
            <div className="form-container">
              <div
                className={
                  selectedForm !== "computer-form"
                    ? "add-item-form hide"
                    : "add-item-form"
                }
              >
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label>Delivery Date</label>
                    <input
                      type="date"
                      className="sys-form-input"
                      placeholder="Delivery Date"
                      onChange={(e) =>
                        setResource({
                          ...resource,
                          date_livraison: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Guarantee</label>
                    <input
                      type="text"
                      className="sys-form-input"
                      placeholder="Guarantee"
                      onChange={(e) =>
                        setResource({ ...resource, garantie: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Computer Brand</label>
                    <input
                      type="text"
                      className="sys-form-input"
                      placeholder="Computer Brand ex : lenovo"
                      onChange={(e) =>
                        setResource({ ...resource, marque: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Computer Cpu</label>
                    <input
                      type="text"
                      className="sys-form-input"
                      placeholder="Computer Cpu ex : intel 7 10gen"
                      onChange={(e) =>
                        setResource({ ...resource, cpu: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Computer Ram</label>
                    <input
                      type="text"
                      className="sys-form-input"
                      placeholder="Computer Ram ex : 16GB DDR4"
                      onChange={(e) =>
                        setResource({ ...resource, ram: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Computer Disk</label>
                    <input
                      type="text"
                      className="sys-form-input"
                      placeholder="Computer Disk ex : 1TB SSD"
                      onChange={(e) =>
                        setResource({ ...resource, disque_dur: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Computer Screen</label>
                    <input
                      type="text"
                      className="sys-form-input"
                      placeholder="Computer Screen ex : ASUS S7"
                      onChange={(e) =>
                        setResource({ ...resource, ecran: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Computer Manufacturer</label>
                    <div className="flex-center">
                      <select
                        type="text"
                        className="sys-form-input"
                        placeholder="Computer Manufacturer ex : RS Maroc"
                        onChange={(e) => setSelectedManufacturer(e.target.value)}
                      >
                        <option>Select Manufacturer</option>
                        {manufacturers.map((m) => (
                          <option value={m.id} key={m.id}>{m.nom_societe}</option>
                        ))}
                      </select>
                      <button
                        onClick={handleManufacturerFormDisplay}
                        className="add-item-button"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="form-row">
                    <input
                      type="submit"
                      className={
                        "sys-form-btn sys-btn-primary" +
                        (loading ? " loading-animation" : "")
                      }
                      value={loading ? "Adding Computer..." : "Add Computer"}
                    />
                  </div>
                </form>
              </div>
            </div>
      </div>
      <div className="form-create-container">
            <div className="form-container">
              <div
                className={
                  selectedForm !== "printer-form"
                    ? "add-item-form hide"
                    : "add-item-form"
                }
              >
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label>Delivery Date</label>
                    <input
                      type="date"
                      className="sys-form-input"
                      placeholder="Delivery Date"
                      onChange={(e) =>
                        setResource({
                          ...resource,
                          date_livraison: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Guarantee</label>
                    <input
                      type="text"
                      className="sys-form-input"
                      placeholder="Guarantee"
                      onChange={(e) =>
                        setResource({
                          ...resource,
                          garantie: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Printer Brand</label>
                    <input
                      type="text"
                      className="sys-form-input"
                      placeholder="Printer Brand ex : HLP"
                      onChange={(e) =>
                        setResource({ ...resource, marque: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Printer Resolution</label>
                    <input
                      type="text"
                      className="sys-form-input"
                      placeholder="Printer Resolution ex : 1720 x 1200"
                      onChange={(e) =>
                        setResource({ ...resource, resolution: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Printer Speed</label>
                    <input
                      type="text"
                      className="sys-form-input"
                      placeholder="Printer Speed ex : 50"
                      onChange={(e) =>
                        setResource({
                          ...resource,
                          vitesse_imprission: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Computer Manufacturer</label>
                    <div className="flex-center">
                      <select
                        type="text"
                        className="sys-form-input"
                        placeholder="Computer Manufacturer ex : RS Maroc"
                        onChange={(e) => setSelectedManufacturer(e.target.value)}
                      >
                        <option>Select Manufacturer</option>
                        {manufacturers.map((m) => (
                          <option value={m.id} key={m.id}>{m.nom_societe}</option>
                        ))}
                      </select>
                      <button
                        onClick={handleManufacturerFormDisplay}
                        className="add-item-button"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="form-row">
                    <input
                      type="submit"
                      className={
                        "sys-form-btn sys-btn-primary" +
                        (loading ? " loading-animation" : "")
                      }
                      value={loading ? "Adding Printer..." : "Add Printer"}
                    />
                  </div>
                </form>
              </div>
            </div>
      </div>
        {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default CreateResource;
