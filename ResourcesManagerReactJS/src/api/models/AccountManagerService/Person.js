export default class Person {
    // add lastName , firstName , CIN , Email , BirthDate 
    constructor(lastName, firstName, CIN, Email, BirthDate) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.CIN = CIN;
        this.Email = Email;
        this.BirthDate = BirthDate;
    }

    getLastName() {
        return this.lastName;
    }

    getFirstName() {
        return this.firstName;
    }

    getCIN() {
        return this.CIN;
    }

    getEmail() {
        return this.Email;
    }

    getBirthDate() {
        return this.BirthDate;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    setCIN(CIN) {
        this.CIN = CIN;
    }

    setEmail(Email) {
        this.Email = Email;
    }

    setBirthDate(BirthDate) {
        this.BirthDate = BirthDate;
    }
}