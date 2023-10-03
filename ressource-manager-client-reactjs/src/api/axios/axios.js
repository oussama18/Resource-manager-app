import axios from "axios";

// config axios create instance
export default axios.create({
    baseURL: "https://localhost:8085/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});
