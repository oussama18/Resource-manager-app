import axios from 'axios';

const URL = 'http://localhost:8085/api/v1';

const DepartementService = (() => {

    const createDepartement = (departement) => {
        return axios.post(`${URL}/departement`, departement);
    };

    const updateDepartement = (departement) => {
        return axios.put(`${URL}/departement`, departement);
    };

    const deleteDepartement = (departementId) => {
        return axios.delete(`${URL}/departement/${departementId}`);
    };

    const getAllDepartements = () => {
        return axios.get(`${URL}/departements`);
    };

    const getDepartementById = (id) => {
        return axios.get(`${URL}/departement/${id}`);
    };

    return {
        createDepartement,
        updateDepartement,
        deleteDepartement,
        getAllDepartements,
        getDepartementById
    };

})();

export default DepartementService;