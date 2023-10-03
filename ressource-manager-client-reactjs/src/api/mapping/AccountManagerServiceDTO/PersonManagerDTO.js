import { Person } from "../../models/AccountManagerService/Person";

const PersonManagerDTO = (() => {
   
    const mapPersonObject = (data) => {

        return new Person(
            data.lastName, 
            data.firstName,
            data.CIN, 
            data.Email, 
            data.BirthDate
        );
    }

    return {
        mapPersonObject
    };

})();

export default PersonManagerDTO;