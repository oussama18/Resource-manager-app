import axios from "axios";

const API_URL = "http://localhost:8085/api/";

export default class AuthenticationService {
  static async login(username, password) {
    const response = await axios.post(API_URL + "login", {
      username,
      password,
    });
    if (response.data) {
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
    }
    return response;
  }

  static logout() {
    localStorage.removeItem("user");
  }

  static isAuthenticated() {
    return {
      state:localStorage.getItem('user')?true:false,
      currentUserData:localStorage.getItem('user')
    };
  }

  getCurrentUser() {
    return "";
  }

  currentUserValue() {
    return "";;
  }
}
