export default class Allocation {
    
    constructor(resource,person,date) {
        this.resource = resource;
        this.person = person;
        this.date = date;
    }

    getResource() {
        return this.resource;
    }

    getPerson() {
        return this.person;
    }

    getDate() {
        return this.date;
    }

    setResource(resource) {
        this.resource = resource;
    }

    setPerson(person) {
        this.person = person;
    }

    setDate(date) {
        this.date = date;
    }
}