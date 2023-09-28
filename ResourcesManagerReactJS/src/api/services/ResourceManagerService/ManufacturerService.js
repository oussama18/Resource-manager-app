import axios from "axios";

const URL = "http://localhost:8085/api/v1";;

const ManufacturerService = (() => {

    const getManufacturers = () => {
        return axios.get(`${URL}/fournisseurs`);
    };

    const getManufacturer = (id) => {
        return axios.get(`${URL}/fournisseur/${id}`);
    };

    const createManufacturer = (manufacturer) => {
        return axios.post(`${URL}/fournisseur`, manufacturer);
    };

    const updateManufacturer = (manufacturer) => {
        return axios.put(`${URL}/fournisseur`, manufacturer);
    };

    const deleteManufacturer = (id) => {
        return axios.delete(`${URL}/fournisseur/${id}`);
    };

    return {
        getManufacturers,
        getManufacturer,
        createManufacturer,
        updateManufacturer,
        deleteManufacturer
    }

})();

export default ManufacturerService;