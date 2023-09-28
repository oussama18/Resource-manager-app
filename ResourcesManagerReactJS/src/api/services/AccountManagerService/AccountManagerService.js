// import http from '../../axios/axios';
import axios from 'axios';

const URL = "http://localhost:8085/api/v1";

const AccountService = (() => {
    // create account
    const createAccount = (account) => {
        return axios.post(URL+"/compte", account);
    };

    // update account
    const updateAccount = (account) => {
        return axios.put(URL+"/compte",account);
    }

    // delete account
    const deleteAccount = (accountUserName) => {
        console.log(accountUserName);
        return axios.delete(URL+"/compte/"+accountUserName);
    }

    // get account
    const getAccount = (accountUserName) => {
        return axios.get(URL+"/compte/"+accountUserName);
    }

    // get all accounts
    const getAllAccounts = () => {
        // get accounts from the json db
        return axios.get(URL+"/comptes");
    }

    return {
        createAccount,
        updateAccount,
        deleteAccount,
        getAccount,
        getAllAccounts
    }

})();

export default AccountService;