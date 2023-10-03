// import http from '../../axios/axios';
import axios from 'axios';

const URL = "http://localhost:8085/api/v1";

const PersonService = (() => {
    
    // create person
    const createPerson = (person) => {
        console.log(person);
        return axios.post(URL+"/personne", person);
    };

    // update person
    const updatePerson = (personId) => {
        return axios.post(URL+"/personne/"+personId);
    }

    // delete person
    const deletePerson = (personId) => {
        console.log(personId);
        return axios.post(URL+"/personne/"+personId);
    }

    // get person
    const getPerson = (personId) => {
        console.log(personId);
        return axios.get(URL+"/personne/"+personId);
    }

    // get all persons
    const getAllPersons = () => {
        return axios.get(URL+"/personnes");
    }

    return {
        createPerson,
        updatePerson,
        deletePerson,
        getPerson,
        getAllPersons
    }

})();

export default PersonService;