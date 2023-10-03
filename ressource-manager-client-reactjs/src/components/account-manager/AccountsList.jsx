import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Account from "./Account";
import AccountService from "../../api/services/AccountManagerService/AccountManagerService";

const AccountsList = () => {

  const [accounts, setAccounts] = useState([]);
  const [formDisplayStatus, setFromDisplayStatus] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);

  // useeffect every time the accounts list is updated

  const handleDelete = async (id) => {

    // confirm delete

    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        await AccountService.deleteAccount(id);
        setAccounts(accounts.filter((account) => account.userName !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };


  useEffect(() => {
    
    AccountService.getAllAccounts().then(response => {
 
      setAccounts(response.data);

    }).catch(error => {
      console.log("error");
    });

  }, []);

  return (
    <>
      <div className="current-title">
        Resource Manager Dashboard \ Accounts
      </div>
      <br />
      <div className="tool-bar flex-center justify-space-between">
        <div className="table-title">All Accounts</div>
        <div className="tool-link">
          <Link
            className="btn btn-tool tool-create"
            to="/resource-manager/accounts/create"
          >
            New Account
          </Link>
        </div>
      </div>
      <br />
      <div className="flex">
        <div className="table accounts-table">
          <div className="table-head flex-center">
            <div className="block">UserName</div>
            <div className="block">Email</div>
            <div className="block">Role</div>
            {/* <div className="block">Type</div> */}
            {/* <div className="block">password</div> */}
            <div className="oper flex-center">
              <div className="block">update</div>
            </div>
            <div className="oper flex-center">
              <div className="block">delete</div>
            </div>
          </div>
          {accounts.map((account, index) => (
            <Account key={index} account={account} handleDelete={handleDelete} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AccountsList;
