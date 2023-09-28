import { Account } from "../../models/AccountManagerService/Account";

const AccountManagerDTO = (() => {
   
    const mapAccountObject = (data) => {

        return new Account(
            data.username,
            data.role,
            data.pwd
        );
    }

    return {
        mapAccountObject
    };

})();

export default AccountManagerDTO;