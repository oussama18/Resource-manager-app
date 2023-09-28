import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountService from "../../../api/services/AccountManagerService/AccountManagerService";
import PersonService from "../../../api/services/AccountManagerService/PersonManagerService";

const CreateAccount = () => {

  const navigate = useNavigate();

  const [account, setAccount] = useState({});
  const [person, setPerson] = useState({});

  const [selectedForm, setSelectedForm] = useState("teacher-form");
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSelectedForm = (e) => {
    let target = e.target;
    let targetId = target.getAttribute("id");

    switch (targetId) {
      case "teacher":
        setSelectedForm("teacher-form");
        break;
      case "admin":
        setSelectedForm("admin-form");
        break;
      default:
        setSelectedForm("teacher-form");
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    switch (selectedForm) {
      case "teacher-form":
        person.type = "enseignant";
        account.roles = [person.type];
        break;
      case "admin-form":
        person.type = "administratif";
        account.roles = [account.roles[0]];
        break;
      default:
        person.type = "";
    }

    account.userName = person.nom + " " + person.prenom;

    let response = await PersonService.createPerson(person);

    account.m_Personne = {
      id: response.data.id,
      type: person.type,
    };

    await AccountService.createAccount(account)
      .then((response) => {

        window.setTimeout(() => {
          navigate("/resource-manager/accounts");
        }, 1500);

      }).catch((error) => {
        setFormErrors(error.response.data);
      });
  };

  return (
    <div className="form create-form">
      <div className="current-title">
        Resource Manager Dashboard \ Resources \ New Account
      </div>
      <br />
      <div className="topbar flex">
        <div
          className={
            selectedForm === "teacher-form"
              ? "item add-item item-selected"
              : "item add-teacher"
          }
          id="teacher"
          onClick={handleSelectedForm}
        >
          Teacher
        </div>
        <br />
        <div
          className={
            selectedForm === "admin-form"
              ? "item add-item item-selected"
              : "item add-admin"
          }
          id="admin"
          onClick={handleSelectedForm}
        >
          Administrative
        </div>
      </div>
      <div className="form-create-container">
        <div className="form-container">
          <div
            className={
              selectedForm !== "teacher-form"
                ? "add-item-form hide"
                : "add-item-form"
            }
          >
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label>Last Name</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPerson({ ...person, nom: e.target.value })
                  }
                  className="sys-form-input"
                  placeholder="Last Name"
                />
              </div>
              <div className="form-row">
                <label>First Name</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPerson({ ...person, prenom: e.target.value })
                  }
                  className="sys-form-input"
                  placeholder="First Name"
                />
              </div>
              <div className="form-row">
                <label>Expertise</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPerson({ ...person, Domaine_d_expert: e.target.value })
                  }
                  className="sys-form-input"
                  placeholder="Expertise ex : Machine Learning, Data Science ..."
                />
              </div>
              <div className="form-row">
                <label>Laboratory</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPerson({ ...person, labo: e.target.value })
                  }
                  className="sys-form-input"
                  placeholder="Laboratory ex : computer science"
                />
              </div>
              <div className="form-row">
                <label>Email</label>
                <input
                  type="email"
                  onChange={(e) =>
                    setPerson({ ...person, email: e.target.value })
                  }
                  className="sys-form-input"
                  placeholder="Email Address"
                />
              </div>
              <div className="form-row">
                <label>Password</label>
                <input
                  type="password"
                  onChange={(e) =>
                    setAccount({ ...account, password: e.target.value })
                  }
                  className="sys-form-input"
                  placeholder="Password"
                />
              </div>
              <div className="form-row">
                <input
                  type="submit"
                  className={
                    "sys-form-btn sys-btn-primary" +
                    (loading ? " loading-animation" : "")
                  }
                  value={loading ? "Adding User..." : "Add User"}
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
              selectedForm !== "admin-form"
                ? "add-item-form hide"
                : "add-item-form"
            }
          >
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label>Last Name</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPerson({ ...person, nom: e.target.value })
                  }
                  className="sys-form-input"
                  placeholder="Last Name"
                />
              </div>
              <div className="form-row">
                <label>First Name</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPerson({ ...person, prenom: e.target.value })
                  }
                  className="sys-form-input"
                  placeholder="First Name"
                />
              </div>
              <div className="form-row">
                <label>Email</label>
                <input
                  type="email"
                  onChange={(e) =>
                    setPerson({ ...person, email: e.target.value })
                  }
                  className="sys-form-input"
                  placeholder="Email Address"
                />
              </div>
              <div className="form-row">
                <label>Account Role</label>
                <select
                  className="sys-form-input"
                  onChange={(e) =>
                    setAccount({ ...account, roles: [e.target.value] })
                  }
                >
                  <option>Select Role</option>
                  <option value="chefDepartement">Departement Chef</option>
                  <option value="responsableRessources">
                    Resource Manager
                  </option>
                </select>
              </div>
              <div className="form-row">
                <label>Password</label>
                <input
                  type="password"
                  onChange={(e) =>
                    setAccount({ ...account, password: e.target.value })
                  }
                  className="sys-form-input"
                  placeholder="Password"
                />
              </div>
              <div className="form-row">
                <input
                  type="submit"
                  className={
                    "sys-form-btn sys-btn-primary" +
                    (loading ? " loading-animation" : "")
                  }
                  value={loading ? "Adding User..." : "Add User"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
