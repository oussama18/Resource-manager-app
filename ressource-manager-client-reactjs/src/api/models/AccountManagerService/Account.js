export class Account {

    constructor(username, role, grade, pwd) {
        
        this.username = username;
        this.role = role;
        this.grade = grade;
        this.pwd = pwd;
    }

    // username getter a,d setter 

    getUserName() {
        return this.username;
    }

    getRole() {
        return this.role;
    }

    getPwd() {
        return this.pwd;
    }

    getGrade() {
        return this.grade;
    }

    setUserName(username) {
        this.username = username;
    }

    setRole(role) {
        this.role = role;
    }

    setPwd(pwd) {
        this.pwd = pwd;
    }  
    
    setGrade(grade) {
        this.grade = grade;
    }
};