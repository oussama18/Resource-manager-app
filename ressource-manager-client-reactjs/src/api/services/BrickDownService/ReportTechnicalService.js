import axios from "axios";

const URL = "http://localhost:8085/api/v1";

const ReportTechnicalService = (() => {

    const createReport = (report) => {
        return axios.post(URL + "/constat",report);
    }

    const getAllReports = () => {
        return axios.get(URL + "/constats");
    }

    const fixResourceBreakdown = (reportId) => {
        return axios.put(URL + "/constats/"+reportId+"/repare");
    }

    const changeBreakedResource = (reportId) => {
        return axios.put(URL + "/constats/"+reportId+"/change");
    }

    const sendMailToManufacturer = (reportId) => {
        return axios.put(URL + "/constats/"+reportId+"/sendMail");
    }

    return{
        createReport:createReport,
        getAllReports:getAllReports,
        fixResourceBreakdown:fixResourceBreakdown,
        changeBreakedResource:changeBreakedResource,
        sendMailToManufacturer:sendMailToManufacturer
    }

})();

export default ReportTechnicalService;