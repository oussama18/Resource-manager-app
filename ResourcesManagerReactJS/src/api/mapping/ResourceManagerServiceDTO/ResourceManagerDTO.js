import { Computer , Printer } from "../../models/ResourceManagerService/Resource";

const ResourceManagerServiceDTO = (() => {

    /**
     * 
     * @param {Object} data 
     * @returns 
     */
    const mapResourceObject = (data) => {

        switch(data.type)
        {
            case 'computer':return new Computer(
                    data.deliveryDate,
                    data.guarentee,
                    data.brand,
                    data.computerCpu,
                    data.computerRam,
                    data.computerDisk,
                    data.computerScreen,
                    data.computerManufacturer
                );
            case 'printer':return new Printer(
                    data.deliveryDate,
                    data.guarentee,
                    data.brand,
                    data.printerModel,
                    data.printerManufacturer
                );
            default:throw new Error("Invalid Resource Type");
        }
    };

    return{
        mapResourceObject
    };

})();

export default ResourceManagerServiceDTO;