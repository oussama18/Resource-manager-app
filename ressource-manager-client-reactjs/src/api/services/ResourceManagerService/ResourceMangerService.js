import axios from "axios";

const URL = "http://localhost:8085/api/v1";


const ResourceManegerService = (() => { 

    const getResource = (resourceId) => {
        return axios.get(URL+"/ressource/"+resourceId)
    };

    // deleteResource
    const deleteResource = (resourceId) => {
        return axios.delete(URL+"/ressource/"+resourceId);
    };

    //deleteAllResources
    const deleteAllResources = () => {
        return axios.get(URL+"/ressources");
    };

    // getAllResources
    const getAllResources = () => {
        return axios.get(URL+"/ressources");
    };

    // updateResource
    const updateResource = (resource) => {
        console.log(resource);
        return axios.put(URL+"/ressource",resource);
    };

    // createResource
    const createResource = (resource) => {
        return axios.post(URL+"/ressource",resource);
    };
    
    return {
        getResource, 
        deleteResource, 
        deleteAllResources, 
        getAllResources, 
        updateResource, 
        createResource
    };
})();

export default ResourceManegerService;