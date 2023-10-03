import axios from "axios";

const URL = "http://localhost:8085/api/v1";

const AllocationReportService = (() => {

    const createAllocationReport = (allocationReport) => {
        console.log(allocationReport);
        return axios.post(URL + "/panne",allocationReport);
    }

    const getAllBreakdowns = () => {
        return axios.get(URL + "/pannes");
    }

    const getBreakdownByUser = (username) => {
        return axios.get(URL + "/pannes/user/"+username);
    }

    return {
        createAllocationReport:createAllocationReport,
        getAllBreakdowns:getAllBreakdowns,
        getBreakdownByUser:getBreakdownByUser
    };

})();

export default AllocationReportService;