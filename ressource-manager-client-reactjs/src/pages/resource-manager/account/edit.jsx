import React,{useState} from "react";
import AccountService from "../../../api/services/AccountManagerService/AccountManagerService";
import AccountManagerDTO from "../../../api/mapping/AccountManagerServiceDTO/AccountManagerDTO";

const EditAccount = ({account}) => {
  
    const [updatedAccount, setUpdatedAccount] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState(null);
    const [formSuccess,setFormSuccess] = useState(false);
  
  
    const handleUpdate = (e) => {
      e.preventDefault();
      
      AccountService.updateAccount(AccountManagerDTO.mapAccountObject(updatedAccount));
    }
  
    return (
      <div className="add-form-container">
        <div className='current-title'>Resource Manager Dashboard \ Accounts \ Edit Account </div>
        <br/>
        <div className="add-item-form">
          <form onSubmit={handleUpdate}>
            <div className="form-row">
              <label>Last Name</label>
              <input
                type="text"
                id="lastName"
                onChange={(e) => setUpdatedAccount({...account, lastName: e.target.value})}
                className="sys-form-input"
                // value={account.lastName}
                placeholder="Last Name"
              />
            </div>
            <div className="form-row">
              <label>First Name</label>
              <input
                type="text"
                id="firstName"
                onChange={(e) => setUpdatedAccount({...account, firstName: e.target.value})}
                className="sys-form-input"
                // value={account.firstName}
                placeholder="First Name"
              />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setUpdatedAccount({...account, email: e.target.value})}
                className="sys-form-input"
                // value={account.email}
                placeholder="Email Address"
              />
            </div>
            <div className="form-row">
              <label>Account Role</label>
              <select className="sys-form-input" id="role" onChange={(e) => setUpdatedAccount({...account, role: e.target.value})}>
                <option>Select Role</option>
                <option value="Resource Manager">Resource Manager</option>
                <option value="Departement Chef">Departement Chef</option>
                <option value="Teacher">Teacher</option>
              </select>
            </div>
            <div className="form-row">
              <label>Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setUpdatedAccount({...account, pwd: e.target.value})}
                className="sys-form-input"
                // value={account.pwd}
                placeholder="Password"
              />
            </div>
            <div className="form-row">
              <input
                type="submit"
                className="sys-form-btn sys-btn-primary"
                value="Update Account"
              />
            </div>
          </form>
        </div>
      </div>
    );
};

export default EditAccount;