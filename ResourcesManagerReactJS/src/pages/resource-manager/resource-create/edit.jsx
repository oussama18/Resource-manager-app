import React, { useState, useEffect } from "react";
import ResourceManegerService from "../../../api/services/ResourceManagerService/ResourceMangerService";

const EditResource = () => {
  const [selectedForm, setSelectedForm] = useState("computer-form");
  const [resource, setResource] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    const resourceId = window.location.href.split("?")[1];

    ResourceManegerService.getResource(resourceId)
      .then((res) => {
        setResource(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    ResourceManegerService.updateResource(resource);
    window.history.back();
  };

  return (
    <div className="form create-form">
      <div className="current-title">
        Resource Manager Dashboard \ Resources \ New Resource{" "}
      </div>
      <br />
      <div className="form-container">
        <div
          className={
            selectedForm !== "computer-form"
              ? "add-item-form hide"
              : "add-item-form"
          }
        >
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="form-left">
                <div className="form-row">
                  <label>Guarantee</label>
                  <input
                    type="text"
                    className="sys-form-input"
                    placeholder="Guarantee"
                    defaultValue={resource.garantie}
                    onChange={(e) => { setResource({ ...resource, garantie: e.target.value }); }}
                  />
                </div>
                <div className="form-row">
                  <label>Computer Brand</label>
                  <input
                    type="text"
                    className="sys-form-input"
                    placeholder="Computer Brand ex : lenovo"
                    defaultValue={resource.marque}
                    onChange={(e) => { setResource({ ...resource, marque: e.target.value }); }}
                  />
                </div>
                <div className="form-row">
                  <label>Computer Cpu</label>
                  <input
                    type="text"
                    className="sys-form-input"
                    placeholder="Computer Cpu ex : intel 7 10gen"
                    defaultValue={resource.cpu}
                    onChange={(e) => { setResource({ ...resource, cpu: e.target.value }); }}
                  />
                </div>
                <div className="form-row">
                  <label>Computer Ram</label>
                  <input
                    type="text"
                    className="sys-form-input"
                    placeholder="Computer Ram ex : 16GB DDR4"
                    defaultValue={resource.ram}
                    onChange={(e) => { setResource({ ...resource, ram: e.target.value }); }}
                  />
                </div>
                <div className="form-row">
                  <label>Computer Disk</label>
                  <input
                    type="text"
                    className="sys-form-input"
                    placeholder="Computer Disk ex : 1TB SSD"
                    defaultValue={resource.disque_dur}
                    onChange={(e) => { setResource({ ...resource, disque_dur: e.target.value }); }}

                  />
                </div>
              </div>
              <div className="form-right">
                <div className="form-row">
                  <label>Computer Screen</label>
                  <input
                    type="text"
                    className="sys-form-input"
                    placeholder="Computer Screen ex : ASUS S7"
                    defaultValue={resource.ecran}
                    onChange={(e) => { setResource({ ...resource, ecran: e.target.value }); }}
                  />
                </div>
                <div className="form-row">
                  <label>Computer Manufacturer</label>
                  <input
                    type="text"
                    className="sys-form-input"
                    placeholder="Computer Manufacturer ex : RS Maroc"
                    // value={resource.fournisseur}
                    onChange={(e) => { setResource({ ...resource, fournisseur: e.target.value }); }}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="submit"
                    className="sys-form-btn sys-btn-primary"
                    value="Update Computer"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div
          className={
            selectedForm !== "printer-form"
              ? "add-item-form hide"
              : "add-item-form"
          }
        >
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="form-left">
                <div className="form-row">
                  <label>Guarantee</label>
                  <input
                    type="text"
                    className="sys-form-input"
                    placeholder="Guarantee"
                    defaultValue={resource.garentie}
                    onChange={(e) => { setResource({ ...resource, garentie: e.target.value }); }}
                  />
                </div>
                <div className="form-row">
                  <label>Printer Brand</label>
                  <input
                    type="text"
                    className="sys-form-input"
                    placeholder="Printer Brand ex : HLP"
                    defaultValue={resource.marque}
                    onChange={(e) => { setResource({ ...resource, marque: e.target.value }); }}
                  />
                </div>
                <div className="form-row">
                  <label>Printer Resolution</label>
                  <input
                    type="text"
                    className="sys-form-input"
                    placeholder="Printer Resolution ex : 1720 x 1200"
                    defaultValue={resource.resolution}
                    onChange={(e) => { setResource({ ...resource, resolution: e.target.value }); }}
                  />
                </div>
              </div>
              <div className="form-right">
                <div className="form-row">
                  <label>Printer Speed</label>
                  <input
                    type="text"
                    className="sys-form-input"
                    placeholder="Printer Speed ex : 50"
                    defaultValue={resource.vitesse_imprission}
                    onChange={(e) => { setResource({ ...resource, vitesse_imprission: e.target.value }); }}
                  />
                </div>
                <div className="form-row">
                  <label>Printer Manufacturer</label>
                  <input
                    type="text"
                    className="sys-form-input"
                    placeholder="Printer Manufacturer ex : RS Maroc"
                    defaultValue={resource.fournisseur}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="submit"
                    className="sys-form-btn sys-btn-primary"
                    // value="Update Printer"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditResource;
