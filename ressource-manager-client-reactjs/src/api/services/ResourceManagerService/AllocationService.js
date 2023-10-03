import axios from "axios";

const URL = "http://localhost:8085/api/v1";;

const AllocationService = (() => {

    const getAllocations = () => {
        return axios.get(URL + "/affectations");
    };

    const getAllocation = (allocationId) => {
        return axios.get(URL + "/affectation/" + allocationId);
    };

    const createAllocationForPerson = (allocation) => {
        return axios.post(URL + "/affectationPers", allocation);
    };

    const createAllocationForDepartement = (allocation) => {
        return axios.post(URL + "/affectationDepar", allocation);
    };

    const updateAllocation = (allocationId, allocation) => {
        return axios.put(URL + "/affectation/" + allocationId, allocation);
    };

    const deleteAllocation = (allocationId) => {
        return axios.delete(URL + "/affectation/" + allocationId);
    };

    const getAllocationsByUser = (username) => {
        return axios.get(URL + "/affectation/user/" + username);
    };

    // allocate resource

    const allocateResource = (allocationId) => {
        return axios.post(URL + "/affectation",allocationId);
    };

    // deallocate resource

    const deallocateResource = (allocationId) => {
        return axios.post(URL + "/affectation",allocationId);
    };

    return {
        getAllocations,
        getAllocation,
        createAllocationForPerson,
        createAllocationForDepartement,
        updateAllocation,
        deleteAllocation,
        allocateResource,
        deallocateResource,
        getAllocationsByUser
    };

})();

export default AllocationService;